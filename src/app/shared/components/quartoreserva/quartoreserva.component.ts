import { Component, Input, Output, EventEmitter, OnChanges, OnInit, OnDestroy, SimpleChanges, Injector, ChangeDetectorRef, TemplateRef, inject } from '@angular/core';
import { QuartosModel } from '../../models/quartos.model';
import { AddDisponibilidadeAdd, DisponiModel, GetReservas, HospedeModel, QuartoDisponibilidade, UopdateDisponibilidadeDay, UpdateReserva } from '../../models/reserva.model';
import { ComponentBase } from '../component.base';
import { DisponibilidadeService } from '../../services/disponibilidade.service';
import { ResponseApi } from '../../models/response.api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReservasService } from '../../services/reservas.service';

@Component({
  selector: 'app-quartoreserva',
  standalone: false,
  templateUrl: './quartoreserva.component.html',
  styleUrls: ['./quartoreserva.component.scss']
})
export class QuartoreservaComponent extends ComponentBase implements OnInit, OnDestroy {
  constructor(public override injector: Injector, 
              private disponibilidadeService: DisponibilidadeService,
              private reservaService: ReservasService,
              private cdr: ChangeDetectorRef) {
    super(injector);
  }
  @Input() dados!: QuartoDisponibilidade | null;
  @Input() collapsed: boolean = false;
  // dates passed from motor: array of { label, iso }
  @Input() dates: { label: string; iso: string }[] = [];

  // dynamic alternate classes for row/column coloring
  @Input() altClasses: string[] = ['alt-white', 'alt-blue'];
  // optional mapping from disponibilidade status to CSS class
  @Input() statusClassMap: Record<string, string> = {};

  @Output() refresh = new EventEmitter<void>();
  private f5Handler?: (e: KeyboardEvent) => void;
  private beforeUnloadHandler?: (e: BeforeUnloadEvent) => void;

  private modalService = inject(NgbModal);

  editDayStr: string | undefined;
  editmaxDays: number | undefined;
  editminDays: number | undefined
  editdayPrice: number | undefined;
  status: number | undefined;
  disp: DisponiModel | null = null;

  updateReserva!: UpdateReserva;
  hospedesEditando: HospedeModel[] = [];  // array LOCAL separado do banco
  isDisponivel: boolean = false;  
  activeTab: string = 'home';
  
  override ngOnInit(): void {
    super.ngOnInit();
   
    this.f5Handler = (e: KeyboardEvent) => {
      const key = (e.key || '').toString();
      const isF5 = key === 'F5' || (e as any).keyCode === 116;
      const isCtrlR = (e.ctrlKey || (e as any).metaKey) && (key.toLowerCase() === 'r' || (e as any).keyCode === 82);
      if (!isF5 && !isCtrlR) return;
      e.preventDefault();
      this.refresh.emit();
      this.cdr.detectChanges();
    };
    window.addEventListener('keydown', this.f5Handler);

    // intercept browser refresh e navegar par /motor
    this.beforeUnloadHandler = (e: BeforeUnloadEvent) => {
      // During unload we should do only synchronous, reliable actions.
      // Store a flag so the app can react after the page is reloaded.
      try {
        
        sessionStorage.setItem('quarto-refresh-pending', 'true');
      } catch (err) {
        // ignore storage errors during unload
      }
      // Setting returnValue ensures some browsers will run the handler
      // and may show a confirmation dialog. We don't attempt SPA
      // navigation here because navigation during unload is not dependable.
      e.preventDefault();
      (e as BeforeUnloadEvent).returnValue = '';
    };

    // Register the beforeunload listener so the handler runs on actual reloads/refreshes
    window.addEventListener('beforeunload', this.beforeUnloadHandler);

  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.f5Handler) window.removeEventListener('keydown', this.f5Handler);
    if (this.beforeUnloadHandler) window.removeEventListener('beforeunload', this.beforeUnloadHandler);
  }


  // find disponibilidade for a given iso date string
  disponibilidadeForDate(iso: string) {

    if (!this.dados?.disponiQuarto) return null;

    const toUtcDay = (s?: string | null): number | null => {
      if (!s) return null;
      const part = s.includes('T') ? s.slice(0,10) : s.split(' ')[0];
      const parts = part.split('-').map(p => Number(p));
      if (parts.length !== 3 || parts.some(isNaN)) return null;
      return Date.UTC(parts[0], parts[1] - 1, parts[2]);
    };

    const target = toUtcDay(iso);
    if (target === null) return null;

    for (const d of this.dados.disponiQuarto) {
      this.dados.disponiQuarto["target"] = target;
      const start = toUtcDay(d.startDate ?? null);
      const end = toUtcDay(d.endDate ?? null);
      if (start !== null && end !== null && target >= start && target <= end){
        // Verifica se existe reserva para esta data e prioriza seu status
        const reserva = this.getReservaForDate(iso);
        if (reserva) {
          d["statusString"] = this.reservaStatusString(reserva.reservaStatus);
        } else {
          d["statusString"] = this.disponiModelStatusString(d.status);
        }
        return d; 
      } 
    }
    return null;
  }
  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  editarDisponibilidade(content: TemplateRef<any>, contentReserva: TemplateRef<any>, disp: DisponiModel | null, dayIso: string) {
    this.disp = disp;
   
    this.isDisponivel = (this.disp?.status === 1);
    if(this.isDisponivel){
       let date = new Date(dayIso);
      date.setDate(date.getDate() + 1);
      this.editDayStr = date.toLocaleDateString('pt-BR');  
      this.editdayPrice = this.disp?.dayPrice;
      this.editmaxDays = this.disp?.maxDays;
      this.editminDays = this.disp?.minDays;

      this.modalService.open(content, { size: 'sm' });
    }else{
      let reserva = this.getReservaForDate(dayIso);
      console.log(reserva);
      if(reserva){
        this.updateReserva = {
          reservaId: reserva.id,
          quartoId: reserva.quartosModelId,
          reservaStatus: reserva.reservaStatus,
          adults: reserva.adults,
          kids: reserva.kids,
          priceTotal: reserva.priceTotal,
          hospede: [] // hospedes ficam em hospedesEditando
        };
        // Deep clone dos hóspedes do banco para array LOCAL independente
        const hospedesOriginais = reserva.hospede || [];
        this.hospedesEditando = hospedesOriginais.map(h => ({
          id: h.id || (h as any).id,
          Name: (h as any).name || h.Name || '',
          FamilyName: (h as any).familyName || h.FamilyName || '',
          Email: (h as any).email || h.Email || '',
          CPF: (h as any).cpf || h.CPF || '',
          Phone: (h as any).phone || h.Phone || '',
          DateBirth: (h as any).dateBirth || h.DateBirth || '',
          CEP: (h as any).cep || h.CEP || '',
          State: (h as any).state || h.State || '',
          City: (h as any).city || h.City || '',
          Address: (h as any).address || h.Address || '',
          Complement: (h as any).complement || h.Complement || '',
          BloodType: (h as any).bloodType || h.BloodType || '',
          principal: (h as any).principal || h.principal || false,
          textArea: (h as any).textArea || h.textArea || ''
        }));
        
        // Se não há hóspedes, cria um hóspede inicial vazio
        if (this.hospedesEditando.length === 0) {
          this.hospedesEditando = [{
            id: null as any,
            Name: '',
            FamilyName: '',
            Email: '',
            CPF: '',
            Phone: '',
            DateBirth: '',
            CEP: '',
            State: '',
            City: '',
            Address: '',
            Complement: '',
            BloodType: '',
            principal: true, // primeiro hóspede sempre principal
            textArea: ''
          }];
        }
        
        // Garante que pelo menos um hóspede seja principal
        this.ensureMainGuest();
        
      }
      this.modalService.open(contentReserva, { size: 'lg' });
    }
    
  }

  getStatusClass(status: number): string {
  switch(status) {
    case 1:
      return 'cinza';
    case 2:
      return 'amarelo';
    case 3:
      return 'laranja';
    case 4:
      return 'vermelho';
    case 5:
      return 'verde';
    default:
      return 'white';
  }
}


  reset(){
    this.editdayPrice = undefined;
    this.editmaxDays = undefined;
    this.editminDays = undefined;
    this.activeTab = 'home';
    // Não limpa o array hospedesEditando aqui para manter as alterações
  }

   disponiModelStatusString(status: number) {
        switch (status) {
        case 1: return 'Disponível';
        case 2:  return 'Pré-Reserva';
        case 3:  return 'Aguardando Pagamento';
        case 4:  return 'Bloqueado';
        case 5:  return 'Confirmada';
        default:  return '';
      }
    }
    reservaStatusString(status: number) {
        switch (status) {
        case 1: return 'Disponível';
        case 2:  return 'Pré-Reserva';
        case 3:  return 'Aguardando Pagamento';
        case 4:  return 'Bloqueado';
        case 5:  return 'Confirmada';
        default:  return '';
      }
    }

    UpdateDisponibilidade(){
     
      if(this.disp == null || this.editdayPrice === undefined || this.editmaxDays === undefined || this.editminDays === undefined){
        this.toastr.error('Preencha todos os campos antes de confirmar a edição da reserva.');
        return;
        
      }
         let addReservaData : UopdateDisponibilidadeDay = {
            Day: this.editDayStr!, 
            dayPrice: this.editdayPrice,
            maxDays: this.editmaxDays!,
            minDays: this.editminDays!
          };
      

     
        this.showLoading();
            this.disponibilidadeService.updateDisponibilidadeDay(addReservaData, this.dados!.id).subscribe({
              next: (response: ResponseApi<any>) => {
                
                if ((response.sucesso || response.success)) {
                  this.toastr.success('Reserva adicionada com sucesso!');
                  this.refresh.emit();
                }
              },
              error: (error: any) => {
                const errorMessage = error.error.mensagem || "Erro ao processar solicitação.";
                console.error('Erro na resposta:', error);
                this.toastr.error(errorMessage);
                this.reset();
                this.hideLoading();
              },
              complete: () => {
                this.hideLoading();
                this.modalService.dismissAll();
                this.reset();
              }
            });
    }

    UpdateReserva(){
      // Garante que pelo menos um hóspede seja principal antes do processamento
      this.ensureMainGuest();
      
      // Coletando dados da reserva (aba Home)
      const reservaData = {
        reservaId: this.updateReserva.reservaId,
        quartoId: this.updateReserva.quartoId,
        reservaStatus: this.updateReserva.reservaStatus,
        adults: this.updateReserva.adults,
        kids: this.updateReserva.kids,
        priceTotal: this.updateReserva.priceTotal
      };
      
      // Coletando dados de todos os hóspedes (do array LOCAL editando)
      const hospedesData = this.hospedesEditando.map((hospede, index) => {
        const principalConverted = this.convertToBoolean(hospede.principal);
        console.log(`Hóspede ${index}: principal original = ${hospede.principal}, convertido = ${principalConverted}`);
        
        return {
          id: hospede.id || null, // null para hóspedes novos, id real para existentes
          Name: hospede.Name || '',
          FamilyName: hospede.FamilyName || '',
          Email: hospede.Email || '',
          CPF: hospede.CPF || '',
          Phone: hospede.Phone || '',
          DateBirth: hospede.DateBirth || '',
          CEP: hospede.CEP || '',
          State: hospede.State || '',
          City: hospede.City || '',
          Address: hospede.Address || '',
          Complement: hospede.Complement || '',
          BloodType: hospede.BloodType || '',
          Principal: principalConverted, // Usando o valor já convertido
          TextArea: hospede.textArea || ''
        };
      });
      
      
      // Construindo os dados no formato esperado pelo DTO C#
      const updateData = {
        reservaId: reservaData.reservaId,
        reservaStatus: reservaData.reservaStatus,
        adults: Number(reservaData.adults) || 0,
        kids: Number(reservaData.kids) || 0,
        priceTotal: Number(reservaData.priceTotal) || 0,
        hospede: hospedesData
      };
      
      console.log('Dados para atualizar:', updateData);
      console.log('Detalhes dos hóspedes:', updateData.hospede.map((h: any, i: number) => 
        `${i}: ${h.Name} ${h.FamilyName} - Principal: ${h.Principal}`
      ));
      
      // Aqui você pode chamar o serviço para salvar os dados
      this.reservaService.doUpdateReservas(this.updateReserva!.quartoId!, updateData).subscribe({
        next: (response) => {
          if (response.sucesso || response.success) {
            this.toastr.success('Reserva atualizada com sucesso!');
            this.refresh.emit();
            this.modalService.dismissAll();
          }
        },
        error: (error) => {
          const errorMessage = error.error.mensagem || "Erro ao processar solicitação.";
          console.error('Erro na resposta:', error);
          this.toastr.error(errorMessage);
        }
      });
      
      
    }

    // Método para obter o nome do hóspede principal para uma data específica
    isFirstCellBarDay(iso: string): boolean {
      const reserva = this.getReservaForDate(iso);
      if (!reserva) return false;

      const idx = this.dates.findIndex(d => d.iso === iso);
      if (idx <= 0) return true;

      const prevDay = this.dates[idx - 1];
      const prevReserva = this.getReservaForDate(prevDay.iso);
      // Se o dia anterior é da mesma reserva e não é split-bar, este não é o primeiro
      if (prevReserva && (prevReserva as any).id === (reserva as any).id && !this.shouldShowSplitBar(prevDay.iso)) {
        return false;
      }
      return true;
    }

    getGuestNameForDate(date: string): string | null {
      // Procura por uma reserva que inclua esta data
      const reserva = this.dados?.reservas?.find(r => 
        this.isDateInRange(date, r.checkin, r.checkout)
      );
      
      if (reserva && reserva.hospede && reserva.hospede.length > 0) {
        // Procura pelo hóspede principal
        if(reserva.hospede.length === 1){
          const singleHospede: any = reserva.hospede[0];
          return singleHospede.name + ' ' + singleHospede.familyName || 'Hóspede';
        }else{
          const hospedeMain: any = reserva.hospede.find(h => h.principal);
          if (hospedeMain) {
            return hospedeMain.name + ' ' + hospedeMain.familyName || 'Hóspede';
         } 
        }
        
        // Se não há hóspede principal definido, pega o primeiro
        return  'Hóspede';
      }
      
      return null;
    }

      // Helper para extrair apenas a data (YYYY-MM-DD) de uma string ISO
      private toDateString(dateStr: string): string {
        if (!dateStr) return '';
        // Pega apenas a parte da data antes do 'T' ou espaço
        const part = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr.split(' ')[0];
        return part;
      }

      // Helper para comparar se uma data está dentro de um range
      private isDateInRange(targetIso: string, startDateStr: string, endDateStr: string): boolean {
        const target = this.toDateString(targetIso);
        const start = this.toDateString(startDateStr);
        const end = this.toDateString(endDateStr);
        
        if (!target || !start || !end) return false;
        
        return target >= start && target <= end;
      }

      getReservaForDate(iso: string) : GetReservas | null {
        if (!this.dados?.reservas) return null;
        
        const targetDateStr = this.toDateString(iso);
        
        for (const reserva of this.dados.reservas) {
          const checkInStr = this.toDateString(reserva.checkin);
          const checkOutStr = this.toDateString(reserva.checkout);
          
          // Inclui checkin e checkout - a lógica de overlap será tratada nos métodos de visualização
          if (targetDateStr >= checkInStr && targetDateStr <= checkOutStr) {
            return reserva;
          }
        }
        
        return null;
      }

      // Verifica se a data é o dia do check-in de uma reserva com early checkin
      hasEarlyCheckIn(iso: string): boolean {
        const reserva = this.getReservaForDate(iso);
        if (!reserva || !reserva.earlyCheckin) return false;
        
        const targetDateStr = this.toDateString(iso);
        const checkInDateStr = this.toDateString(reserva.checkin);
        
        return targetDateStr === checkInDateStr;
      }

      // Verifica se a data é o dia do check-out de uma reserva com late checkout
      hasLateCheckOut(iso: string): boolean {
        const reserva = this.getReservaForDate(iso);
        if (!reserva || !reserva.lateCheckout) return false;
        
        const targetDateStr = this.toDateString(iso);
        const checkOutDateStr = this.toDateString(reserva.checkout);
        
        return targetDateStr === checkOutDateStr;
      }

      // Verifica se é dia de check-in
      isCheckInDay(iso: string): boolean {
        const reserva = this.getReservaForDate(iso);
        if (!reserva) return false;
        
        const targetDateStr = this.toDateString(iso);
        const checkInDateStr = this.toDateString(reserva.checkin);
        
        return targetDateStr === checkInDateStr;
      }

      // Verifica se é dia de check-out
      isCheckOutDay(iso: string): boolean {
        const reserva = this.getReservaForDate(iso);
        if (!reserva) return false;
        
        const targetDateStr = this.toDateString(iso);
        const checkOutDateStr = this.toDateString(reserva.checkout);
        
        return targetDateStr === checkOutDateStr;
      }

      // Verifica se há alguma reserva com checkout nesta data
      hasCheckoutOnDate(iso: string): boolean {
        if (!this.dados?.reservas) return false;
        
        const targetDateStr = this.toDateString(iso);
        
        return this.dados.reservas.some(reserva => {
          const checkOutStr = this.toDateString(reserva.checkout);
          return targetDateStr === checkOutStr;
        });
      }

      // Verifica se há alguma reserva com checkin nesta data
      hasCheckinOnDate(iso: string): boolean {
        if (!this.dados?.reservas) return false;
        
        const targetDateStr = this.toDateString(iso);
        
        return this.dados.reservas.some(reserva => {
          const checkInStr = this.toDateString(reserva.checkin);
          return targetDateStr === checkInStr;
        });
      }

      // Verifica se há reservas diferentes com checkout e checkin na mesma data
      hasDifferentReservasOnDate(iso: string): boolean {
        if (!this.dados?.reservas) return false;
        
        const targetDateStr = this.toDateString(iso);
        
        const checkoutReserva = this.dados.reservas.find(r => 
          this.toDateString(r.checkout) === targetDateStr
        );
        
        const checkinReserva = this.dados.reservas.find(r => 
          this.toDateString(r.checkin) === targetDateStr
        );
        
        return !!(checkoutReserva && checkinReserva && checkoutReserva.id !== checkinReserva.id);
      }

      // Retorna a classe CSS para a primeira metade da barra
      getFirstHalfClass(iso: string): string {
        // Verifica se há reservas diferentes se encontrando nesta data
        if (this.hasDifferentReservasOnDate(iso)) {
          return this.getCheckoutReservaStatusClass(iso);
        }
        
        const reserva = this.getReservaForDate(iso);
        if (!reserva) return '';
        
        // No dia do check-in SEM early checkin, primeira metade fica disponível
        if (this.isCheckInDay(iso) && !reserva.earlyCheckin) {
          return 'disponivel-half';
        }
        
        // No dia do check-out, primeira metade é ocupada
        if (this.isCheckOutDay(iso)) {
          return this.getReservaStatusClass(iso);
        }
        
        return this.getReservaStatusClass(iso);
      }

      // Retorna a classe CSS para a segunda metade da barra
      getSecondHalfClass(iso: string): string {
        // Verifica se há reservas diferentes se encontrando nesta data
        if (this.hasDifferentReservasOnDate(iso)) {
          return this.getCheckinReservaStatusClass(iso);
        }
        
        const reserva = this.getReservaForDate(iso);
        if (!reserva) return '';
        
        // No dia do check-in, segunda metade é ocupada
        if (this.isCheckInDay(iso)) {
          return this.getReservaStatusClass(iso);
        }
        
        // No dia do check-out SEM late checkout, segunda metade fica disponível
        if (this.isCheckOutDay(iso) && !reserva.lateCheckout) {
          return 'disponivel-half';
        }
        
        return this.getReservaStatusClass(iso);
      }

      // Verifica se deve mostrar barra dividida
      // Mostra split quando: check-in SEM early, checkout SEM late, OU quando duas reservas diferentes se encontram
      shouldShowSplitBar(iso: string): boolean {
        const hasCheckoutThisDay = this.hasCheckoutOnDate(iso);
        const hasCheckinThisDay = this.hasCheckinOnDate(iso);
        
        // Se há checkout E checkin na mesma data de reservas diferentes
        if (hasCheckoutThisDay && hasCheckinThisDay) {
          return this.hasDifferentReservasOnDate(iso);
        }
        
        const reserva = this.getReservaForDate(iso);
        if (!reserva) return false;

        const isCheckin = this.isCheckInDay(iso);
        const isCheckout = this.isCheckOutDay(iso);

        // Se é dia de check-in E NÃO tem early checkin -> mostra split
        if (isCheckin && !reserva.earlyCheckin) {
          return true;
        }

        // Se é dia de check-out E NÃO tem late checkout -> mostra split
        if (isCheckout && !reserva.lateCheckout) {
          return true;
        }

        // Caso contrário, barra completa
        return false;
      }

      getReservaStatusClass(iso: string): string {
        const reserva = this.getReservaForDate(iso);
        if (!reserva) return '';
        
        // Use o status da reserva para determinar a cor
        switch(reserva.reservaStatus) {
          case 1: // Disponível
            return 'cinza';
          case 2: // Pré-Reserva
            return 'amarelo';
          case 3: // Aguardando Pagamento
            return 'laranja';
          case 4: // Bloqueado
            return 'vermelho';
          case 5: // Confirmada
            return 'verde';
          default:
            return '';
        }
      }

      getCombinedStatusClass(iso: string): string {
        let disp = this.disponibilidadeForDate(iso);
        let reserva: any | null = this.getReservaForDate(iso);
        
        // Prioridade: reserva sobrescreve disponibilidade
        if (reserva) {
          
          return this.getReservaStatusClass(iso);
        }
        
        if (disp) {
          return this.getStatusClass(disp.status);
        }


        
        return '';
      }

      // Retorna a classe da reserva que faz checkout nesta data
      getCheckoutReservaStatusClass(iso: string): string {
        if (!this.dados?.reservas) return '';
        
        const targetDateStr = this.toDateString(iso);
        
        const reserva = this.dados.reservas.find(r => {
          const checkOutStr = this.toDateString(r.checkout);
          return targetDateStr === checkOutStr;
        });
        
        if (!reserva) return '';
        
        switch(reserva.reservaStatus) {
          case 1: return 'cinza';
          case 2: return 'amarelo';
          case 3: return 'laranja';
          case 4: return 'vermelho';
          case 5: return 'verde';
          default: return '';
        }
      }

      // Retorna a classe da reserva que faz checkin nesta data
      getCheckinReservaStatusClass(iso: string): string {
        if (!this.dados?.reservas) return '';
        
        const targetDateStr = this.toDateString(iso);
        
        const reserva = this.dados.reservas.find(r => {
          const checkInStr = this.toDateString(r.checkin);
          return targetDateStr === checkInStr;
        });
        
        if (!reserva) return '';
        
        switch(reserva.reservaStatus) {
          case 1: return 'cinza';
          case 2: return 'amarelo';
          case 3: return 'laranja';
          case 4: return 'vermelho';
          case 5: return 'verde';
          default: return '';
        }
      }

      // Métodos para controle de tabs
      setActiveTab(tab: string) {
        this.activeTab = tab;
        this.cdr.detectChanges();
      }

  // Método para garantir que apenas um hóspede seja principal
  onPrincipalChange(index: number) {
    console.log('onPrincipalChange chamado para index:', index);
    console.log('Estado atual do principal:', this.hospedesEditando[index].principal);
    
    // Se este hóspede foi marcado como principal
    if (this.hospedesEditando[index].principal) {
      // Desmarca todos os outros como não principal
      this.hospedesEditando.forEach((hospede, i) => {
        if (i !== index) {
          hospede.principal = false;
        }
      });
      console.log('Desmarcou outros hóspedes como principal');
    } else {
      // Se tentou desmarcar um principal, verifica se há outros principais
      const hasOtherMain = this.hospedesEditando.some((h, i) => i !== index && h.principal);
      if (!hasOtherMain) {
        // Se não há outros principais, força este a ser principal
        this.hospedesEditando[index].principal = true;
        this.toastr.warning('Pelo menos um hóspede deve ser marcado como principal.');
        console.log('Forçou hóspede a continuar como principal');
      }
    }
    
    this.cdr.detectChanges();
    console.log('Estados após mudança:', this.hospedesEditando.map((h, i) => `${i}: ${h.principal}`));
  }

      addHospede() {
        console.log('addHospede chamado. Array atual:', this.hospedesEditando.length, 'elementos');
        
        const novoHospede: HospedeModel = {
          id: null as any, // null indica hóspede novo para o backend
          Name: '',
          FamilyName: '',
          Email: '',
          CPF: '',
          Phone: '',
          DateBirth: '',
          CEP: '',
          State: '',
          City: '',
          Address: '',
          Complement: '',
          BloodType: '',
          textArea: '',
          principal: this.hospedesEditando.length === 0 // primeiro hóspede é sempre principal
        };
        

        // Cria novo array com o hóspede adicionado
        this.hospedesEditando = [...this.hospedesEditando, novoHospede];
        
        // Automaticamente muda para a aba do novo hóspede
        this.activeTab = 'hospede-' + (this.hospedesEditando.length - 1);
        
        console.log('Após adicionar hóspede. Array:', this.hospedesEditando.length, 'elementos');
        console.log('Primeiro hóspede principal:', this.hospedesEditando[0]?.principal);
        
        // Força detecção de mudanças
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 0);
      }

      removeHospede(index: number) {
        console.log('removeHospede chamado com index:', index);
        console.log('Array atual:', this.hospedesEditando.length, 'elementos');
        
        // Verificação básica se o array existe
        if (!this.hospedesEditando || !Array.isArray(this.hospedesEditando)) {
          console.warn('Array hospedesEditando não existe ou não é array');
          return;
        }

        // Não permite remover se só tem 1 hóspede
        if (this.hospedesEditando.length <= 1) {
          this.toastr.warning('A reserva deve ter pelo menos um hóspede.');
          return;
        }

        // Validação de índice mais robusta
        if (index < 0 || index >= this.hospedesEditando.length) {
          console.warn('Índice inválido:', index, 'Array length:', this.hospedesEditando.length);
          return;
        }

        // Lembra se o hóspede removido era o principal
        const removerPrincipal = this.hospedesEditando[index].principal;

        // Cria cópia REAL do array sem o elemento removido
        const arrayAtual = [...this.hospedesEditando];
        arrayAtual.splice(index, 1);
        
        console.log('Array após remoção:', arrayAtual.length, 'elementos');

        // Se removeu o principal e ainda há hóspedes, marca o primeiro como principal
        if (removerPrincipal && arrayAtual.length > 0) {
          arrayAtual[0].principal = true;
          console.log('Marcou novo hóspede como principal após remoção');
        }

        // Ajusta a aba ativa ANTES de atualizar o array
        if (this.activeTab === 'hospede-' + index) {
          this.activeTab = index > 0 ? 'hospede-' + (index - 1) : 'home';
        } else if (this.activeTab.startsWith('hospede-')) {
          const currentIdx = parseInt(this.activeTab.split('-')[1], 10);
          if (currentIdx > index) {
            this.activeTab = 'hospede-' + (currentIdx - 1);
          }
        }

        // Substitui o array completamente
        this.hospedesEditando = arrayAtual;

        // Força múltiplas atualizações para garantir
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 0);
      }
  private convertToBoolean(value: any): boolean {
    console.log('convertToBoolean input:', value);
    
    // Se já for boolean, retorna o valor
    if (typeof value === 'boolean') {
      console.log('convertToBoolean output (boolean):', value);
      return value;
    }
    // Se for string, converte
    if (typeof value === 'string') {
      const result = value.toLowerCase() === 'true' || value === '1';
      console.log('convertToBoolean output (string):', result);
      return result;
    }
    // Se for número, converte (1 = true, 0 = false)
    if (typeof value === 'number') {
      const result = value === 1;
      console.log('convertToBoolean output (number):', result);
      return result;
    }
    // Qualquer outro caso retorna false
    console.log('convertToBoolean output (default):', false);
    return false;
  }

  // Método de debug - pode remover depois
  debugHospedes() {
    console.log('=== DEBUG HOSPEDES ===');
    console.log('Array length:', this.hospedesEditando.length);
    console.log('Active tab:', this.activeTab);
    console.log('Hóspedes:');
    this.hospedesEditando.forEach((h, i) => {
      console.log(`  ${i}: ${h.Name} ${h.FamilyName} - Principal: ${h.principal} (tipo: ${typeof h.principal})`);
    });
    console.log('Principal em dados finais:');
    const principalCount = this.hospedesEditando.filter(h => h.principal).length;
    console.log(`  Total de principais: ${principalCount}`);
    console.log('======================');
  }

  // Método para limpar e resetar hóspedes (debug) 
  limparTodosHospedes() {
    this.hospedesEditando = [{
      id: null as any,
      Name: '',
      FamilyName: '',
      Email: '',
      CPF: '',
      Phone: '',
      DateBirth: '',
      CEP: '',
      State: '',
      City: '',
      Address: '',
      Complement: '',
      BloodType: '',
      principal: true, // primeiro hóspede sempre principal
      textArea: ''
    }];
    this.activeTab = 'home';
    this.cdr.detectChanges();
  }

  // Método para garantir que sempre tenha um hóspede principal
  ensureMainGuest() {
    if (this.hospedesEditando.length > 0) {
      const hasMain = this.hospedesEditando.some(h => h.principal);
      if (!hasMain) {
        // Se nenhum é principal, marca o primeiro
        this.hospedesEditando[0].principal = true;
        console.log('Marcou primeiro hóspede como principal automaticamente');
      }
    }
  }
}
