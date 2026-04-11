import { Component, inject, Injector, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { NgbCalendar, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentBase } from 'src/app/shared/components/component.base';
import { MenubarComponent } from 'src/app/shared/components/menubar/menubar.component';
import { QuartosModel } from 'src/app/shared/models/quartos.model';
import { AddDisponibilidadeAdd, AddReservaAdd, DisponiModel, DisponiResponseApi, QuartoDisponibilidade } from 'src/app/shared/models/reserva.model';
import { ResponseApi } from 'src/app/shared/models/response.api';
import { DateRangeService } from 'src/app/shared/services/date-range.service';
import { DisponibilidadeService } from 'src/app/shared/services/disponibilidade.service';
import { HotelService } from 'src/app/shared/services/hotel.service';
import { MenubarService } from 'src/app/shared/services/menubar.service';
import { QuartosService } from 'src/app/shared/services/quartos.service';
import { ReservasService } from 'src/app/shared/services/reservas.service';

@Component({
  selector: 'app-motor',
  standalone: false,
  templateUrl: './motor.component.html',
  styleUrl: './motor.component.scss'
})
export class MotorComponent extends ComponentBase{
  // track collapse per quarto (keyed by quarto id)
  collapsedMap: { [quartoId: string]: boolean } = {};
  // track collapse per hotel (keyed by hotel name)
  hotelCollapsedMap: { [hotelName: string]: boolean } = {};
  // array of { label, iso } to render header and allow date comparisons
  quartosPerHotel!: QuartosModel[];
  idModal!: number;
  groupedByQuarto!: QuartoDisponibilidade[];
  tipoFiltro: string = '';
  searchTerm: string = '';

  collapsed: boolean = false;
  //calendar
  calendar = inject(NgbCalendar);

	hoveredDate: NgbDate | null = null;
	fromDate!: NgbDate | null ;
	toDate!: NgbDate | null;


  totalAdd: number = 0;
  //calendar
  
   private modalService = inject(NgbModal);
  
  // convert NgbDate to UTC ISO (YYYY-MM-DDTHH:mm:ss.sssZ)
  private toIsoUtc = (d: NgbDate | null): string => {
    if (!d) return '';
    const jsDate = new Date(Date.UTC(d.year, d.month - 1, d.day, 0, 0, 0));
    return jsDate.toISOString();
  };
   
  hoteis: any[] | undefined;
  hotelId: string | null = null;

  earlyCheckin = false;
  lateCheckout = false;

  addReservaData!: AddDisponibilidadeAdd;
  addReservaQuartoId!: string | undefined;
  addReservaStatus!: string | undefined;
  addQuartoLista!: QuartosModel[] | undefined;
  mostraQuarto: boolean = false;
  mostraTudo: boolean = false;

  addReservaAdd: AddReservaAdd = {
    reservaStatus: 0,
    checkin: '',
    checkout: '',
    earlyCheckin: false,
    lateCheckout: false,
    adults: 0,
    kids: 0,
    cupom: '',
    priceTotal: 0
  };
reservas: any[] = [];
  allDates: { label: string; iso: string, dayOfWeek: string }[] = [];
  /**
   *
   */
  constructor(public override injector: Injector, 
            private hotelService: HotelService,
            public menubarService: MenubarService,
            public dateRangeService: DateRangeService,
            private disponibilidadeService: DisponibilidadeService,
            public quartosService: QuartosService,
            private reservasService: ReservasService,
            private cdr: ChangeDetectorRef
  ) {
    super(injector);
    
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.hotelId = this.cookieService.get("selected_hotel_id");
    if(this.activatedRoute.snapshot.paramMap.get('hotelId')){
      this.hotelId = this.activatedRoute.snapshot.paramMap.get('hotelId');
      // ou, para escutar mudanças:
      this.activatedRoute.paramMap.subscribe(params => {
        this.hotelId = params.get('hotelId');
    });

    this.dateRangeService.setDateRange(Date.now().toString(), (Date.now() + 30 * 24 * 60 * 60 * 1000).toString());
  }
    // }
    // const pending = (() => { try { return sessionStorage.getItem('quarto-refresh-pending'); } catch { return null; } })();
    // if (pending) {
    //   try { sessionStorage.removeItem('quarto-refresh-pending'); } catch (_) { /* ignore */ }
    //   // Depois de um reload real, navegar para /motor para manter comportamento igual ao F5
    //   try { //se já esta dentro de motor, não deve navegar
    //     if (this.router.url !== 'motor') {
    //       this.router.navigate(['/motor']);
    //     }
    //   } catch (err) { /* ignore */ }
    //   this.cdr.detectChanges();
    // }
    // this.initializeReal();

  }

  initializeReal() {
    const existing = this.dateRangeService.getDateRange() || { startDate: '', endDate: '' };
    if (!existing.startDate || !existing.endDate) {
      this.dateRangeService.setDateRange(this.toIsoUtc(this.fromDate), this.toIsoUtc(this.toDate ?? this.fromDate));
    }
    this.allDates = this.dateRangeService.getAllDatesBetween();

    if(this.hotelId)
      this.getAllQuartos(this.hotelId);
  
  }

  changeEarlyCheckin() {
    // O [(ngModel)] já atualiza o valor automaticamente
    // Não precisa inverter manualmente
    console.log('Early Checkin:', this.earlyCheckin);
  }
  changeLateCheckout() {
    // O [(ngModel)] já atualiza o valor automaticamente
    // Não precisa inverter manualmente
    console.log('Late Checkout:', this.lateCheckout);
  }


   toggle(quartoId: string | number) {
    const key = String(quartoId);
    this.collapsedMap[key] = !this.collapsedMap[key];
  }

  isCollapsed(quartoId: string | number) {
    const key = String(quartoId);
    return this.collapsedMap[key] ?? true;
  }

  toggleHotel(hotelName: string) {
    const key = String(hotelName);
    this.hotelCollapsedMap[key] = !this.hotelCollapsedMap[key];
  }

  isHotelCollapsed(hotelName: string) {
    const key = String(hotelName);
    // default to true (collapsed) when not set
    return this.hotelCollapsedMap[key] ?? false;
  }

// doGetAllHoteis(){
//   this.groupedByHotel = {};
//   this.hotelService.doGetUserIdHoteis().subscribe({
//     next: (result) => {
//       this.hoteis = result.data?.map(hotel => {
//         return {
//           ...hotel,
//           name: hotel.name.toUpperCase(),
//           id: hotel.id
//         };
//       });
//     },
//     complete: () => {
//       this.hoteis?.forEach((hotel: any) => {
//         this.getAllQuartos(hotel);
//       });
      
//     }
//   });
// }

toggleCollapse(hotelKey: string) {

    this.collapsed = !this.collapsed;
  }

  handleRefresh(): void {
    if (this.hotelId) {
      this.getAllQuartos(this.hotelId);
      //atualizar componente filho
      this.cdr.detectChanges();
    }
  }

  getAllQuartos(hotelId: string) {
    console.log('motor: getAllQuartos called for hotelId=', hotelId);
    this.showLoading();
    this.quartosService.doGetQuartosByHotelId(hotelId).subscribe({
      next: (response: ResponseApi<QuartosModel[]>) => {
        if ((response.sucesso || response.success) && response.data) {
          this.quartosPerHotel = response.data;
          this.addQuartoLista = response.data.sort((a, b) => a.numero - b.numero || a.name.localeCompare(b.name));
        } else {
          this.quartosPerHotel = [];
        }
      },
      error: (error) => {
        const errorMessage = error.error.mensagem || "Erro ao processar solicitação.";
        console.error('Erro na resposta:', errorMessage);
        this.toastr.error(errorMessage);
        this.hideLoading();
      },
      complete: () => {
        this.hideLoading();
        
        if (!this.quartosPerHotel || this.quartosPerHotel.length === 0) {
          this.tratamentoFinal([]);
          return;
        }

        // Usa o período do dateRangeService ou define um período padrão
        const existingRange = this.dateRangeService.getDateRange();
        const startIso = existingRange?.startDate || this.toIsoUtc(this.fromDate);
        const endIso = existingRange?.endDate || this.toIsoUtc(this.toDate ?? this.fromDate);

        let allDisponibilidadeQuartos: QuartoDisponibilidade[] = [];
        let completedRequests = 0;
        const totalQuartos = this.quartosPerHotel.length;

        this.quartosPerHotel.forEach(quarto => {
          // Usa doGetDisponibilidadePorPeriodo ao invés de doGetDisponibilidade
          this.disponibilidadeService.doGetDisponibilidadePorPeriodo(quarto.id, startIso, endIso).subscribe({
            next: (response: ResponseApi<any>) => {
              console.log(`motor: disponibilidade por período for quarto ${quarto.id}`, response);
              
              let disponiArray: DisponiModel[] = [];
              
              if ((response.sucesso || response.success) && response.data) {
                disponiArray = Array.isArray(response.data) ? response.data : [response.data];

                disponiArray.forEach((disponi: DisponiModel) => {
                  disponi.status = disponi.status as unknown as number;
                  disponi.statusString = this.disponiModelStatusString(disponi.status);
                });
              }

              // Busca as reservas do período para este quarto
              this.reservasService.doGetReservasPorPeriodo(quarto.id, startIso, endIso).subscribe({
                next: (reservasResp: ResponseApi<any>) => {
                  console.log(`motor: reservas por período for quarto ${quarto.id}`, reservasResp);
                  
                  const reservasArray = (reservasResp.sucesso || reservasResp.success) && reservasResp.data
                    ? (Array.isArray(reservasResp.data) ? reservasResp.data : [reservasResp.data])
                    : [];

                  allDisponibilidadeQuartos.push({
                    id: quarto.id,
                    name: quarto.name,
                    number: quarto.numero,
                    categoryName: quarto.category?.[0]?.name,
                    disponiQuarto: disponiArray,
                    reservas: reservasArray // Adiciona as reservas ao objeto
                  });
                },
                error: (error) => {
                  const errorMessage = error.error.mensagem || "Erro ao processar solicitação.";
                  console.error('Erro na resposta:', errorMessage);
                  this.toastr.error(errorMessage);

                  // Adiciona o quarto mesmo com erro nas reservas
                  allDisponibilidadeQuartos.push({
                    id: quarto.id,
                    name: quarto.name,
                    number: quarto.numero,
                    categoryName: quarto.category?.[0]?.name,
                    disponiQuarto: disponiArray,
                    reservas: []
                  });
                },
                complete: () => {
                  completedRequests++;
                  if (completedRequests === totalQuartos) {
                    this.tratamentoFinal(allDisponibilidadeQuartos);
                  }
                }
              });
            },
            error: (error) => {
              const errorMessage = error.error.mensagem || "Erro ao processar solicitação.";
              console.error('Erro na resposta:', errorMessage);
              this.toastr.error(errorMessage);
              
              completedRequests++;
              if (completedRequests === totalQuartos) {
                this.tratamentoFinal(allDisponibilidadeQuartos);
              }
            }
          });
        });
      }
    });
}

reloadPeriodoDisponibilidade() {
    if (!this.fromDate || !this.toDate || !this.groupedByQuarto?.length) return;

    const toIsoUtc = (d: NgbDate): string => {
      const jsDate = new Date(Date.UTC(d.year, d.month - 1, d.day, 0, 0, 0));
      return jsDate.toISOString();
    };

    const startIso = toIsoUtc(this.fromDate);
    const endIso = toIsoUtc(this.toDate);

    // Atualiza o dateRangeService com o novo período
    this.dateRangeService.setDateRange(startIso, endIso);
    this.allDates = this.dateRangeService.getAllDatesBetween();

    let completedRequests = 0;
    const totalRequests = this.groupedByQuarto.length * 2; // disponibilidade + reservas

    this.groupedByQuarto.forEach(q => {
      // Atualiza disponibilidades
      this.disponibilidadeService
        .doGetDisponibilidadePorPeriodo(q.id, startIso, endIso)
        .subscribe({
          next: (resp) => {
            q.disponiQuarto = resp.data || [];
            q.disponiQuarto.forEach((disponi: DisponiModel) => {
              disponi.status = disponi.status as unknown as number;
              disponi.statusString = this.disponiModelStatusString(disponi.status);
            });
          },
          complete: () => {
            completedRequests++;
            if (completedRequests === totalRequests) {
              this.cdr.detectChanges();
            }
          }
        });

      // Atualiza reservas
      this.reservasService
        .doGetReservasPorPeriodo(q.id, startIso, endIso)
        .subscribe({
          next: (resp) => {
            const reservasArray = resp.data || [];
            // Atualiza a propriedade reservas do quarto ao invés da variável global
            (q as any).reservas = reservasArray;
          },
          complete: () => {
            completedRequests++;
            if (completedRequests === totalRequests) {
              this.cdr.detectChanges();
            }
          }
        });
    });
  
}

  disponiModelStatusString(status: number): string {
        switch (status) {
        case 1: return 'Disponível';
        case 2: return 'Pré-Reserva';
        case 3: return 'Aguardando Pagamento';
        case 4: return 'Bloqueado';
        case 5: return 'Confirmada';
        default: return '';
      }
    }

  getDaysOfYear(year: number): { label: string; iso: string }[] {
    const dates: { label: string; iso: string }[] = [];
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);

    const weekdays = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const weekday = weekdays[d.getDay()];
      const iso = d.toISOString().slice(0,10);
      dates.push({ label: `${weekday} (${day}/${month})`, iso });
    }

    return dates;
  }

  tratamentoFinal(allDisponibilidadeQuartos: QuartoDisponibilidade[]) {
    // Não resetar se já existir dados
    if (!this.groupedByQuarto) {
      this.groupedByQuarto = [];
    }
    
    this.groupedByQuarto = allDisponibilidadeQuartos.sort((a, b) => a.number - b.number || a.name.localeCompare(b.name, 'pt-BR'));
    // ensure Angular updates the view
    try {
      this.cdr.detectChanges();
    } catch (err) {
    }

  }

  // Helper: list of expanded quartos within a hotel
  getExpandedQuartos(quartos: QuartoDisponibilidade[]): QuartoDisponibilidade[] {
    return quartos.filter(q => !this.isCollapsed(q.id));
  }

  openConfirmModal(content: TemplateRef<any>, id: number) {
    // Initialize form model to avoid undefined bindings in the modal
    this.addReservaData = {
      status: 0,
      startDate: '',
      endDate: '',
      dayPrice: 0,
      minDays: 1,
      maxDays: 0,
      reembolsavel: false
    };
    this.idModal = id;
    this.modalService.open(content, { size: 'lg' });
  }

  addReserva(){
    if(this.idModal == 1){
      this.addReservaData.status = 1;

      if(!this.addReservaData || !this.addReservaQuartoId || !this.addReservaData.status ||
        this.addReservaData.startDate == '' || this.addReservaData.dayPrice < 0 
      ){
        this.reset();
        this.toastr.error('Preencha todos os campos.'); 
        return;
      }

      this.showLoading();
      this.disponibilidadeService.addDisponibilidade(this.addReservaData, this.addReservaQuartoId).subscribe({
        next: (response: ResponseApi<any>) => {
          
          if ((response.sucesso || response.success)) {
            this.toastr.success('Reserva adicionada com sucesso!');
          }
        },
        error: (error: any) => {
          const errorMessage = error.error.mensagem || "Erro ao processar solicitação.";
          this.toastr.error(errorMessage);
          this.hideLoading();
        },
        complete: () => {
          this.hideLoading();
          this.reset();
          this.addReservaQuartoId = undefined;
          this.addReservaStatus = undefined;
          this.modalService.dismissAll();
          this.handleRefresh();
        }
      });

    }else if(this.idModal == 2 || this.idModal == 3){
      this.trataStatus();
      this.addReservaAdd.checkin = this.addReservaData.startDate;
      this.addReservaAdd.checkout = this.addReservaData.endDate;
      this.addReservaAdd.priceTotal = this.totalAdd;
      this.addReservaAdd.earlyCheckin = this.convertToBoolean(this.earlyCheckin);
      this.addReservaAdd.lateCheckout = this.convertToBoolean(this.lateCheckout);
      this.showLoading();

      this.reservasService.addReservas(this.addReservaAdd, this.addReservaQuartoId!).subscribe({
        next: (response: ResponseApi<any>) => {
          if ((response.sucesso || response.success)) {
            this.toastr.success('Reserva adicionada com sucesso!');
          }else{
            console.log(response);
          }
        },
        error: (error: any) => {
          const errorMessage = error.error.mensagem || "Erro ao processar solicitação.";
          this.toastr.error(errorMessage);
          this.hideLoading();
        },
        complete: () => {
          this.hideLoading();
          this.reset();
          this.addReservaQuartoId = undefined;
          this.addReservaStatus = undefined;
          this.modalService.dismissAll();
          this.handleRefresh();

        }
      });
    }
  }

  trataStatus() {
    this.addReservaAdd.reservaStatus = parseInt(this.addReservaStatus!);
  }

  // quartosPerHotelId():any {
  //   if(this.addReservaHotelId){
  //       this.quartosService.doGetQuartosByHotelId(this.addReservaHotelId).subscribe({
  //         next: (response: ResponseApi<QuartosModel[]>) => {
  //           this.addQuartoLista = response.data;
  //           this.mostraQuarto = true; //mostra formulário de quartos
  //         },
  //         error: (error) => {
  //           const errorMessage = error.message || 'Erro ao carregar quartos do hotel';
  //           console.error('Erro na resposta:', errorMessage);
  //           this.toastr.error(errorMessage);
  //           this.hideLoading();
  //         },
  //         complete: () => {
  //           this.hideLoading();

  //         }
  //       });
  //     }
  // }

  private convertToBoolean(value: any): boolean {
    // Se o valor atual for undefined/null, usa o valor original
   console.log('convertToBoolean input:', value);
   console.log('convertToBoolean output:', typeof value);
    // Se já for boolean, retorna o valor
    if (typeof value === 'boolean') {
      return value;
    }
    // Se for string, converte
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true' || value === '1';
    }
    // Se for número, converte (1 = true, 0 = false)
    if (typeof value === 'number') {
      return value === 1;
    }
    // Qualquer outro caso retorna false
    return false;
  }
  
  mostraTudoBool(){
    if(this.addReservaQuartoId != "undefined")
      this.mostraTudo = true;
    else
      this.mostraTudo = false;

    if (this.mostraTudo && !this.addReservaData) {
      this.addReservaData = {
        status: 0,
        startDate: '',
        endDate: '',
        dayPrice: 0,
        minDays: 0,
        maxDays: 0,
        reembolsavel: true
      };
    }
  }

  get tiposDisponiveis(): string[] {
    if (!this.groupedByQuarto) return [];
    const nomes = this.groupedByQuarto
      .map(q => q.categoryName)
      .filter((n): n is string => !!n);
    return [...new Set(nomes)].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  }

  get filteredGroupedByQuarto(): QuartoDisponibilidade[] {
    if (!this.groupedByQuarto) return [];
    if (!this.tipoFiltro) return this.groupedByQuarto;
    return this.groupedByQuarto.filter(q => q.categoryName === this.tipoFiltro);
  }

  get formattedDateRange(): { start: string; end: string } {
    const range = this.dateRangeService.getDateRange();
    const fmt = (iso: string): string => {
      if (!iso) return '—';
      const d = new Date(iso);
      if (isNaN(d.getTime())) return '—';
      return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
    };
    return { start: fmt(range.startDate), end: fmt(range.endDate) };
  }

  reset(){
    this.addReservaQuartoId = undefined;
    this.addReservaStatus = undefined;
    this.mostraQuarto = false;
    this.mostraTudo = false;
    this.addReservaData = {
        status: 0,
        startDate: '',
        endDate: '',
        dayPrice: 0,
        minDays: 0,
        maxDays: 0,
        reembolsavel: true
      };
    this.addReservaAdd = {
        reservaStatus: 0,
        checkin: '',
        checkout: '',
        earlyCheckin: false,
        lateCheckout: false,
        adults: 0,
        kids: 0,
        cupom: '',
        priceTotal: 0
      };
    this.totalAdd = 0;
    this.earlyCheckin = false;
    this.lateCheckout = false;
    this.fromDate = Date.now().toString() as unknown as NgbDate;
    this.toDate = Date.now().toString() as unknown as NgbDate;
  }


  onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}

      // Ensure UTC ISO strings to satisfy PostgreSQL 'timestamptz'
      const toIsoUtc = (d: NgbDate): string => {
        const jsDate = new Date(Date.UTC(d.year, d.month - 1, d.day, 0, 0, 0));
        return jsDate.toISOString();
      };

    this.addReservaData.startDate = toIsoUtc(this.fromDate);
    this.addReservaData.endDate = toIsoUtc(this.toDate ?? this.fromDate);

    if (this.idModal == 2) {
      this.totalAdd = 0;
      const selStartDate = new Date(this.addReservaData.startDate);
      const selEndDate = new Date(this.addReservaData.endDate);
      // treat selected end date as inclusive (end of day) to avoid timezone/truncation issues
      const selEndDateInclusive = new Date(selEndDate);
      selEndDateInclusive.setHours(23, 59, 59, 999);

      // iterate with for..of so we can early-return when encountering an error
      const msPerDay = 24 * 60 * 60 * 1000;
      // Calculate nights (pernoites) instead of total days
      const selNights = Math.floor((selEndDate.getTime() - selStartDate.getTime()) / msPerDay);

      for (const q of this.groupedByQuarto || []) {
        if (q.id == this.addReservaQuartoId) {
          if (!q.disponiQuarto) continue;

          // Remove the tracking variables since we're no longer iterating day by day
          // Track which specific ISO dates we've already counted to avoid double-counting
          // const countedDates = new Set<string>();

          for (const disp of q.disponiQuarto) {
            if (!disp.startDate || !disp.endDate) continue;

            const dispStartDate = new Date(disp.startDate);
            const dispEndDate = new Date(disp.endDate);
            // treat disponibilidade end date as inclusive (end of day)
            const dispEndDateInclusive = new Date(dispEndDate);
            dispEndDateInclusive.setHours(23, 59, 59, 999);

            const overlapStartTime = Math.max(dispStartDate.getTime(), selStartDate.getTime());
            const overlapEndTime = Math.min(dispEndDateInclusive.getTime(), selEndDateInclusive.getTime());

            console.debug('motor overlap check', {
              quartoId: q.id,
              dispStart: disp.startDate,
              dispEnd: disp.endDate,
              selStart: this.addReservaData.startDate,
              selEnd: this.addReservaData.endDate,
              overlapStart: new Date(overlapStartTime).toISOString(),
              overlapEnd: new Date(overlapEndTime).toISOString()
            });

            if (overlapStartTime <= overlapEndTime) {
              // Calculate nights in the overlap period
              // For hotel reservations, we charge per night, not per day
              // So if check-in is Friday and check-out is Monday, that's 3 nights
              const overlapNights = Math.floor((overlapEndTime - overlapStartTime) / msPerDay);
              
              if (overlapNights > 0 && disp.dayPrice > 0) {
                this.totalAdd += disp.dayPrice * overlapNights;
              } else if (overlapNights > 0) {
                this.toastr.error('Existem dias sem preço definido. Faça o cadastro das Taxas.');
              }
            }
          }

          // Validate that we have pricing for all nights in the selected period
          // This is a simplified validation since we're now calculating by overlap periods
          if (this.totalAdd === 0 && selNights > 0) {
            this.toastr.error('Existem dias sem preço definido. Faça o cadastro das Taxas.');
          }
        }
      }
    }
  }

    
	

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}
}