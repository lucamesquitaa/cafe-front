import { Component, Inject, inject, Injector, OnInit, TemplateRef} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentBase } from 'src/app/shared/components/component.base';
import { Contact, DetalhesModel, DetalhesModelByManager, Photo } from 'src/app/shared/models/hotel.model';
import { HotelService } from 'src/app/shared/services/hotel.service';
import { MenubarService } from 'src/app/shared/services/menubar.service';
import { PhotosService } from 'src/app/shared/services/photos.service';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent extends ComponentBase implements OnInit {
  itemCadastro: DetalhesModelByManager = {} as DetalhesModelByManager;
  originalItemCadastro: DetalhesModelByManager = {} as DetalhesModelByManager; // Backup dos valores originais

  acceptTerms1: boolean = false;
  acceptTerms2: boolean = false;

  category!: number ;

  currentStep: number = 1;

  hotelId!: string | null;

  imagens: string[] = [];
  imagensNew: File[] = [];
 private modalService = inject(NgbModal);
  errorList: string[] = [];
  
  lobbyStartHour: number | null = null;
  lobbyStartPeriod: string = 'AM';
  lobbyEndHour: number | null = null;
  lobbyEndPeriod: string = 'PM';

  // Armazena o estado de conclusão de cada step
  completedSteps: Set<number> = new Set<number>();

  steps = [
    { number: 1, title: 'Informações Básicas', description: 'Dados básicos do hotel' },
    { number: 2, title: 'Representante Legal', description: 'Dados do responsável' },
    { number: 3, title: 'Endereço', description: 'Localização do hotel' },
    { number: 4, title: 'Informações Complementares', description: 'Detalhes adicionais' },
    { number: 5, title: 'Serviços', description: 'Comodidades oferecidas' },
    { number: 6, title: 'Imagens', description: 'Fotos do hotel' },
    { number: 7, title: 'Conclusão', description: 'Finalizar cadastro' }
  ];

  constructor(
    public override injector: Injector, 
    private hotelService: HotelService,
    public menubarService: MenubarService,
    private photosService: PhotosService,
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
      
        if (this.hotelId) {
          this.showLoading();
          this.imagens = [];
          this.getAllPhotos(this.hotelId);
          this.hotelService.doGetHotelByManager(this.hotelId).subscribe({
            next: (item) => {
                  if (item.data) {
                    this.itemCadastro = item.data;
                    // Fazer backup dos valores originais
                    this.originalItemCadastro = JSON.parse(JSON.stringify(item.data));
                    this.parseLobby(item.data.lobby);
                  }
                  console.log("item cadastro:");
                  console.log(item);
                },
                error: (err) => {
                  console.error('Erro ao buscar coordenadas:', err);
                  this.hideLoading();
                },
                complete: () => {
                  this.hideLoading();
                }
              });
        }
      });
    }else{
      if (this.hotelId) {
          this.showLoading();
          this.imagens = [];
          this.getAllPhotos(this.hotelId);
          this.hotelService.doGetHotelByManager(this.hotelId).subscribe({
            next: (item) => {
                  if (item.data) {
                    this.itemCadastro = item.data;
                    // Fazer backup dos valores originais
                    this.originalItemCadastro = JSON.parse(JSON.stringify(item.data));
                    this.parseLobby(item.data.lobby);
                  }
                  console.log("item cadastro:");
                  console.log(item);
                },
                error: (err) => {
                  console.error('Erro ao buscar coordenadas:', err);
                  this.hideLoading();
                },
                complete: () => {
                  this.hideLoading();
                }
              });
        }
    }
  }

  parseLobby(lobby: string) {
    if (!lobby) return;
    const parts = lobby.split(' - ');
    if (parts.length === 2) {
      const startParts = parts[0].trim().split(' ');
      const endParts = parts[1].trim().split(' ');
      if (startParts.length >= 2) {
        this.lobbyStartHour = parseInt(startParts[0]) || null;
        this.lobbyStartPeriod = startParts[1] || 'AM';
      }
      if (endParts.length >= 2) {
        this.lobbyEndHour = parseInt(endParts[0]) || null;
        this.lobbyEndPeriod = endParts[1] || 'PM';
      }
    }
  }

  onchangeURL()
  {
    if(this.itemCadastro.name){
      let url = this.itemCadastro.name.toLowerCase();
      url = url.replace(/ /g, '-');
      this.itemCadastro.url = url;
    }
  }

  onValidaCadastro(atual: number): boolean{
  
    if(atual === 1){
        // Limpa erros anteriores para validar novamente
        this.errorList = [];
        
        // Valida Nome Fantasia
        if(!this.itemCadastro?.name || this.itemCadastro.name.trim() === ''){
            this.errorList.push('O campo Nome Fantasia é obrigatório.');
        }
        
        // Valida CNPJ 
        if (!this.itemCadastro?.cnpj || this.itemCadastro.cnpj.trim() === '') { 
            this.errorList.push('O campo CNPJ é obrigatório.');
        }else if(this.itemCadastro.cnpj.length != 14){
            this.errorList.push('O campo CNPJ deve conter 14 dígitos.');
        }
        
        // Valida URL
        if (!this.itemCadastro?.url || this.itemCadastro.url.trim() === '') { 
            this.errorList.push('O campo URL é obrigatório.');
        }
        
        // Valida Razão Social
        if (!this.itemCadastro?.razao || this.itemCadastro.razao.trim() === '') { 
            this.errorList.push('O campo Razão Social é obrigatório.');
        }
        
        // Valida Categoria
        if (this.itemCadastro.category == undefined) { 
            this.errorList.push('O campo Categoria é obrigatório.');
        }
        
        // Retorna true se não houver erros
        if(this.errorList.length === 0)
         return true;
        else
         return false;

    }else if(atual === 2){
        // Valida Nome Representante
        this.errorList = [];
        if(!this.itemCadastro?.nomeRep || this.itemCadastro.nomeRep.trim() === ''){
            this.errorList.push('O campo Nome do Representante é obrigatório.');
        }
        // Valida CPF Representante
        if(!this.itemCadastro?.cpfRep || this.itemCadastro.cpfRep.trim() === ''){
            this.errorList.push('O campo CPF do Representante é obrigatório.');
        }else if(this.itemCadastro.cpfRep.length != 11){
            this.errorList.push('O campo CPF deve conter 11 dígitos.');
        }

        // Valida Telefone Representante
        if(!this.itemCadastro?.telRep || this.itemCadastro.telRep.trim() === ''){
            this.errorList.push('O campo Telefone do Representante é obrigatório.');
        }else if(this.itemCadastro.telRep.length != 11){
            this.errorList.push('O campo Telefone deve conter 11 dígitos.');
        }

        // Valida Email Representante
        if(!this.itemCadastro?.emailRep || this.itemCadastro.emailRep.trim() === ''){
            this.errorList.push('O campo Email do Representante é obrigatório.');
        }


       // Retorna true se não houver erros
         if(this.errorList.length === 0)
         return true;
        else
         return false;

    }else if(atual === 3){
       
        this.errorList = [];

        // Valida endereço
        if(!this.itemCadastro?.address || this.itemCadastro.address.trim() === ''){
            this.errorList.push('O campo Endereço é obrigatório.');
        }
        // Valida número
        if(!this.itemCadastro?.number || this.itemCadastro.number.trim() === ''){
            this.errorList.push('O campo Número é obrigatório.');
        }
        // Valida cidade
        if(!this.itemCadastro?.city || this.itemCadastro.city.trim() === ''){
            this.errorList.push('O campo Cidade é obrigatório.');
        }
        // Valida CEP
        if(!this.itemCadastro?.cep || this.itemCadastro.cep.trim() === ''){
            this.errorList.push('O campo CEP é obrigatório.');
        }else if(this.itemCadastro.cep.length != 8){
            this.errorList.push('O campo CEP deve conter 8 dígitos.');
        }
        
        // Retorna true se não houver erros
        if(this.errorList.length === 0)
         return true;
        else
         return false;
          
    }else if(atual === 4){
      // Valida Descrição e outros campos
        this.errorList = [];

        if(!this.itemCadastro?.description || this.itemCadastro.description.trim() === ''){
            this.errorList.push('O campo Descrição é obrigatório.');
        } 
        // Valida Lobby
        if(!this.lobbyStartHour || !this.lobbyEndHour){
            this.errorList.push('O campo Horário do Lobby é obrigatório.');
        }
        // Valida Diferenciais
        if(!this.itemCadastro?.diff || this.itemCadastro.diff.trim() === ''){
            this.errorList.push('O campo Diferenciais é obrigatório.');
        }
        // Valida Child
        if(this.itemCadastro.child == undefined){
            this.errorList.push('O campo Aceita Crianças é obrigatório.');
        }
        // Valida Pets
        if(this.itemCadastro.pets == undefined){
            this.errorList.push('O campo Aceita Pets é obrigatório.');
        }
        // Retorna true se não houver erros
         if(this.errorList.length === 0)
         return true;
        else
         return false;
          
    }else if(atual === 5){
        // Valida Coffee 
        this.errorList = [];
        if(this.itemCadastro.coffee == undefined){
            this.errorList.push('O campo Café da manhã é obrigatório.');
        }
        // Valida Wifi
        if(this.itemCadastro.wifi == undefined){
            this.errorList.push('O campo Wifi é obrigatório.');
        }
        // Valida Swimming
        if(this.itemCadastro.swimming == undefined){
            this.errorList.push('O campo Piscina é obrigatório.');
        }
        // Valida Cleaning
        if(this.itemCadastro.cleaning == undefined){
            this.errorList.push('O campo Serviço de limpeza é obrigatório.');
        }
        // Valida Gym
        if(this.itemCadastro.gym == undefined){
            this.errorList.push('O campo Academia é obrigatório.');
        }
        // Retorna true se não houver erros
        if(this.errorList.length === 0)
         return true;
        else
         return false;
     
    }else if(atual === 6){
       this.errorList = [];
       if(this.imagensNew.length + this.imagens.length > 10){
            this.errorList.push('O máximo de 10 imagens por hotel.');
        }
      if(this.errorList.length === 0)
         return true;
        else
         return false;
    }else if(atual === 7){
       this.errorList = [];
      // Valida checkboxes
        // if(this.acceptTerms1 == undefined || this.acceptTerms1 == false){
        //     this.errorList.push('O campo Termos de Serviço é obrigatório.');
        // }
        // // Valida Gym
        // if(this.acceptTerms2 == undefined || this.acceptTerms2 == false){
        //     this.errorList.push('O campo Política de Privacidade é obrigatório.');
        // }

        // // Retorna true se não houver erros
        // if(this.errorList.length === 0)
        //  return true;
        // else
        //  return false;

        return true;
    }else{
      return false;
    }
  }

  goToStep(step: number) {
    if(this.onValidaCadastro(this.currentStep)) {
      // Marca o step atual como completo antes de avançar
      this.completedSteps.add(this.currentStep);
      this.currentStep = step;
    }else if(this.completedSteps.has(this.currentStep)){
      this.completedSteps.delete(this.currentStep);
    }
  }

  isStepCompleted(step: number): boolean {
    // Verifica apenas se o step está no Set de steps completos
    return this.completedSteps.has(step);
  }

  onFileSelected(event: any) {
    const files = Array.from(event.target.files) as File[];
    if (files.length + this.imagens.length > 8) {
      alert('Você pode selecionar no máximo 8 imagens (no total).');
    } else {
      this.imagensNew = files;
    }
  }

  private convertToBoolean(value: any, originalValue: any): boolean {
    // Se o valor atual for undefined/null, usa o valor original
    if (value === undefined || value === null) {
      if (originalValue === undefined || originalValue === null) {
        return false;
      }
      // Converte o valor original
      if (typeof originalValue === 'boolean') {
        return originalValue;
      }
      if (typeof originalValue === 'string') {
        return originalValue.toLowerCase() === 'true' || originalValue === '1';
      }
      if (typeof originalValue === 'number') {
        return originalValue === 1;
      }
      return false;
    }
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
  concluirCadastro(){
    if (!this.itemCadastro) {
      alert('Dados do cadastro estão incompletos.');
      return;
    }
    
    // Combina os campos do lobby em uma string
    this.itemCadastro.lobby = `${this.lobbyStartHour} ${this.lobbyStartPeriod} - ${this.lobbyEndHour} ${this.lobbyEndPeriod}`;

    //os itens booleanos devem ser convertidos de string para boolean, preservando valores originais
    this.itemCadastro.child = this.convertToBoolean(this.itemCadastro.child, this.originalItemCadastro.child);
    this.itemCadastro.pets = this.convertToBoolean(this.itemCadastro.pets, this.originalItemCadastro.pets);
    this.itemCadastro.coffee = this.convertToBoolean(this.itemCadastro.coffee, this.originalItemCadastro.coffee);
    this.itemCadastro.wifi = this.convertToBoolean(this.itemCadastro.wifi, this.originalItemCadastro.wifi);
    this.itemCadastro.swimming = this.convertToBoolean(this.itemCadastro.swimming, this.originalItemCadastro.swimming);
    this.itemCadastro.cleaning = this.convertToBoolean(this.itemCadastro.cleaning, this.originalItemCadastro.cleaning);
    this.itemCadastro.gym = this.convertToBoolean(this.itemCadastro.gym, this.originalItemCadastro.gym);

    this.showLoading();
    this.hotelService.doPostHotel(this.itemCadastro, this.hotelId).subscribe({
      next: (response: any) => {
        this.toastr.success('Cadastro atualizado com sucesso.');
         // Tenta com 'Id' maiúsculo ou 'id' minúsculo
        

        console.log('Resposta do servidor:', response);
        console.log('response.data:', response?.data);
        console.log('ID do quarto:', response?.data?.Id || response?.data?.id);

        const hotelId = response?.data?.Id || response?.data?.id;
        
        if (hotelId) {
          this.uploadFotos(hotelId);
        } else {
          console.error('ID do quarto não encontrado na resposta:', response);
          this.toastr.error('Erro: ID do quarto não foi retornado pelo servidor.');
  
        }
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.mensagem || error.error.excecaoMensagem || "Erro no servidor.");
        this.hideLoading();
      },
      complete: () => {
        if (!this.imagensNew || this.imagensNew.length === 0) {
          this.hideLoading();
        }
      }
    });
  }

  uploadFotos(hotelId: string) {
    const formData = new FormData();

    this.imagensNew.forEach(file => {
      formData.append('files', file);
    });
    this.showLoading();
    if (hotelId) {
      this.photosService.postPhotos(formData, hotelId).subscribe({
        next: (response) => {
          if(response.data && response.data.length > 0){
            this.toastr.success('Fotos enviadas com sucesso.');
          }
          this.hideLoading();
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          console.log(error);
          this.hideLoading();
          this.toastr.error(error.error.mensagem || error.error.excecaoMensagem || "Erro ao enviar fotos.");
        }
      });
    }
  }

  getAllPhotos(hotelId: string) {
    this.photosService.getPhotos(hotelId).subscribe({
      next: (response) => {
        this.imagens = response.data.map((photo: Photo) => photo.id);
      },
      error: (error) => {
        console.log('Erro ao buscar fotos:', error);
      }
    });
  }

  onDeleteImgs() {
    this.showLoading();
      this.photosService.deletePhotosEmLote(this.imagens).subscribe({
        next: (response) => {
          this.toastr.success('Fotos deletadas com sucesso.');
          this.imagens = [];
          this.imagensNew = [];
        },
        error: (error) => {
          console.log(error);
          this.toastr.error(error.error.mensagem || error.error.excecaoMensagem || "Erro ao deletar fotos.");
          this.hideLoading();
          this.modalService.dismissAll();
        },
        complete: () => {
          this.hideLoading();
          this.modalService.dismissAll();
        }
      });

  }
  openConfirmModal(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'lg' });
  }
}
