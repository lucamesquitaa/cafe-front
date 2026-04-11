import { Component, inject, Injector, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectRemoteComponent } from 'src/app/shared/components/select-remote/select-remote.component';
import { CadastroTipoQuartoComponent } from '../tipos/cadastro-tipo/cadastro-tipo.component';
import { ComponentBase } from 'src/app/shared/components/component.base';
import { QuartosModel, RoomBedDTO } from 'src/app/shared/models/quartos.model';
import { QuartosService } from 'src/app/shared/services/quartos.service';
import { MenubarService } from 'src/app/shared/services/menubar.service';
import { ResponseApi } from 'src/app/shared/models/response.api';
import { CategoryQuartosService } from 'src/app/shared/services/category.quartos.service';
import { CategoryQuartosModel } from 'src/app/shared/models/categoryQuartos.model';
import { PhotosService } from 'src/app/shared/services/photos.service';
import { Photo } from 'src/app/shared/models/hotel.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroQuartoComponent extends ComponentBase implements OnInit {
  @ViewChild(SelectRemoteComponent) selectRemote!: SelectRemoteComponent;

  itemCadastro: QuartosModel = {} as QuartosModel;
  originalItemCadastro: QuartosModel = {} as QuartosModel; // Backup dos valores originais

  acceptTerms1: boolean = false;
  acceptTerms2: boolean = false;

  categorys: any[] = [];
  beds: RoomBedDTO[] = [];
  private modalService = inject(NgbModal);
  apiUrlCategoryQuartos!: string;
  currentStep: number = 1;

  quartoId!: string | null;

  hotelId!: string ;
  imagensNew: File[] = [];
  imagens: string[] = [];

  errorList: string[] = [];
  
  // Armazena o estado de conclusão de cada step
  completedSteps: Set<number> = new Set<number>();

  steps = [
    { number: 1, title: 'Informações Básicas', description: 'Dados básicos do quarto' },
    { number: 2, title: 'Comodidades', description: 'Comodidades e serviços' },
    { number: 3, title: 'Imagens', description: 'Fotos do quarto' },
    { number: 4, title: 'Conclusão', description: 'Finalizar cadastro' }
  ];

  constructor(
    public override injector: Injector, 
    private quartosService: QuartosService,
    public menubarService: MenubarService,
    public categoryQuartosService: CategoryQuartosService,
    private photosService: PhotosService,
  ) {
    super(injector);
    

  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.quartoId = this.activatedRoute.snapshot.paramMap.get('quartoId');
    this.hotelId = this.cookieService.get('hotel_id');
    
    // Inicializar beds como array vazio se não existir
    if (!this.itemCadastro.beds) {
      this.itemCadastro.beds = [];
    }
    
    // ou, para escutar mudanças:
    this.activatedRoute.paramMap.subscribe(params => {
      this.quartoId = params.get('quartoId');
      this.apiUrlCategoryQuartos = environment.apiBaseUrl + "/api/CategoryQuarto/" + this.hotelId;
      if (this.quartoId && this.hotelId) {
        this.showLoading();
        this.getAllPhotos(this.quartoId);
        this.quartosService.GetQuartoById(this.quartoId).subscribe({
          next: (response: ResponseApi<QuartosModel>) => {
                if (response.data) {
                  this.itemCadastro = response.data;
                  // Fazer backup dos valores originais
                  this.originalItemCadastro = JSON.parse(JSON.stringify(response.data));
                  console.log("Quarto carregado para edição:", this.itemCadastro);
                  
                  this.beds = this.itemCadastro.beds || [];
                  
                  this.categorys = this.itemCadastro.category.map((cat: CategoryQuartosModel) => ({
                    label: cat.name,
                    value: cat.id
                  }));


                }
              },
              error: (err: any) => {
                console.error('Erro ao buscar quarto:', err);
                this.hideLoading();
              },
              complete: () => {
                this.hideLoading();
              }
            });
      }
    });
  }

  onValidaCadastro(atual: number): boolean{
    if(atual == 1){
       // Limpa erros anteriores para validar novamente
        this.errorList = [];
        
      if(!this.itemCadastro?.numero || this.itemCadastro.numero.toString().trim() === ''){
            this.errorList.push('O campo Número do quarto é obrigatório.');
        }
        // Valida Nome Fantasia
        if(!this.itemCadastro?.name || this.itemCadastro.name.trim() === ''){
            this.errorList.push('O campo Nome do quarto é obrigatório.');
        }
        
        // Valida maxOcupation
        if (!this.itemCadastro?.maxOcupation || this.itemCadastro.maxOcupation == 0) { 
            this.errorList.push('O campo ocupação máxima é obrigatório.');
        }
        
        // Valida Categoria
        if (!this.categorys || this.categorys.length === 0) { 
            this.errorList.push('O campo Categoria é obrigatório.');
        }
        
        // Retorna true se não houver erros
        if(this.errorList.length === 0)
         return true;
        else
         return false;
    }else if(atual == 2){
        this.errorList = [];
        
        // Valida Camas
        if(!this.beds || this.beds?.length === 0){
            this.errorList.push('O campo Tipos de Cama é obrigatório.');
        }
        
        // Retorna true se não houver erros
        if(this.errorList.length === 0)
         return true;
        else
         return false;
    }else if(atual == 3){
      this.errorList = [];
        // images
         if( this.imagensNew.length + this.imagens.length > 5) {
            this.errorList.push('O campo Imagens aceita no máximo 5 fotos (no total).');
        }
        
        // Retorna true se não houver erros
        if(this.errorList.length === 0)
         return true;
        else
         return false;
    }else if(atual == 4){
      this.errorList = [];
        // Validação final - termos aceitos
        // if (this.acceptTerms1 == undefined || this.acceptTerms1 == false) { 
        //     this.errorList.push('O campo termos de cadastro é obrigatório.');
        // }

        // if( this.acceptTerms2 == undefined || this.acceptTerms2 == false) {
        //     this.errorList.push('O campo política de privacidade é obrigatório.');
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
    if (files.length > 10) {
      alert('Você pode selecionar no máximo 10 imagens!');
    } else {
      this.imagensNew = files;
      // Converter arquivos para URLs ou base64 se necessário
      // Por enquanto mantendo como está para compatibilidade
    }
  }
  onCadastrarTipoQuarto(searchTerm: string) {
    const ref = this.modalService.open(CadastroTipoQuartoComponent, { size: 'lg', centered: true });
    ref.componentInstance.hotelId = this.hotelId;
    ref.componentInstance.nomePre = searchTerm;
    ref.result.then(
      () => {
        // Recarrega as opções do select após criação bem-sucedida
        if (this.selectRemote) {
          this.selectRemote.loadInitialData();
        }
      },
      () => {}
    );
  }

  onCadastrarComodidade() {
    // Funcionalidade para cadastrar nova comodidade
    alert('Funcionalidade para cadastrar nova comodidade seria implementada aqui!');
    
    // Exemplo de implementação:
    // this.router.navigate(['/admin/comodidades/novo']);
    // ou
    // this.openModalCadastroComodidade();
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

  onConcluirCadastro(){
    const hotelId = this.cookieService.get('hotel_id');
    if (!hotelId) {
      alert('Hotel ID não encontrado.');
      return;
    }
    this.itemCadastro.category = this.categorys.map((cat: any) => ({
      id: cat.value,
      name: cat.label
    }));
    
    // Converte bedType para enum numérico
    this.itemCadastro.beds = this.beds.map((bed) => ( {
      quantity: bed.quantity,
      bedType: Number(bed.bedType)
    }));

    console.log('Camas convertidas:', this.itemCadastro.beds);
    
    // Debug: log dos valores antes da conversão
    console.log('Valores ANTES da conversão:', {
      refund: this.itemCadastro.refund,
      freeze: this.itemCadastro.freeze,
      vault: this.itemCadastro.vault,
      telephone: this.itemCadastro.telephone,
      coffee: this.itemCadastro.coffee,
      wifi: this.itemCadastro.wifi,
      fridge: this.itemCadastro.fridge,
      cleaning: this.itemCadastro.cleaning,
      varanda: this.itemCadastro.varanda,
      bathroom: this.itemCadastro.bathroom,
      tv: this.itemCadastro.tv
    });
    
    // Converte strings para booleans, preservando valores originais
    this.itemCadastro.refund = this.convertToBoolean(this.itemCadastro.refund, this.originalItemCadastro.refund);
    this.itemCadastro.freeze = this.convertToBoolean(this.itemCadastro.freeze, this.originalItemCadastro.freeze);
    this.itemCadastro.vault = this.convertToBoolean(this.itemCadastro.vault, this.originalItemCadastro.vault);
    this.itemCadastro.telephone = this.convertToBoolean(this.itemCadastro.telephone, this.originalItemCadastro.telephone);
    this.itemCadastro.coffee = this.convertToBoolean(this.itemCadastro.coffee, this.originalItemCadastro.coffee);
    this.itemCadastro.wifi = this.convertToBoolean(this.itemCadastro.wifi, this.originalItemCadastro.wifi);
    this.itemCadastro.fridge = this.convertToBoolean(this.itemCadastro.fridge, this.originalItemCadastro.fridge);
    this.itemCadastro.cleaning = this.convertToBoolean(this.itemCadastro.cleaning, this.originalItemCadastro.cleaning);
    this.itemCadastro.varanda = this.convertToBoolean(this.itemCadastro.varanda, this.originalItemCadastro.varanda);
    this.itemCadastro.bathroom = this.convertToBoolean(this.itemCadastro.bathroom, this.originalItemCadastro.bathroom);
    this.itemCadastro.tv = this.convertToBoolean(this.itemCadastro.tv, this.originalItemCadastro.tv);
    
    // Debug: log dos valores após a conversão
    console.log('Valores APÓS da conversão:', {
      refund: this.itemCadastro.refund,
      freeze: this.itemCadastro.freeze,
      vault: this.itemCadastro.vault,
      telephone: this.itemCadastro.telephone,
      coffee: this.itemCadastro.coffee,
      wifi: this.itemCadastro.wifi,
      fridge: this.itemCadastro.fridge,
      cleaning: this.itemCadastro.cleaning,
      varanda: this.itemCadastro.varanda,
      bathroom: this.itemCadastro.bathroom,
      tv: this.itemCadastro.tv
    });
    
  
    this.showLoading();
    this.quartosService.doPostPutQuarto(this.itemCadastro, hotelId).subscribe({
      next: (response: any) => {
        this.toastr.success('Quarto cadastrado com sucesso.');
        console.log('Resposta do servidor:', response);
        console.log('response.data:', response?.data);
        console.log('ID do quarto:', response?.data?.Id || response?.data?.id);
        
        // Tenta com 'Id' maiúsculo ou 'id' minúsculo
        const quartoId = response?.data?.Id || response?.data?.id;
        
        if (quartoId) {
          this.uploadFotos(this.hotelId!, quartoId);
        } else {
          console.error('ID do quarto não encontrado na resposta:', response);
          this.toastr.error('Erro: ID do quarto não foi retornado pelo servidor.');
  
        }
      },
      error: (error: any) => {
        this.toastr.error(error.error?.mensagem || error.error?.excecaoMensagem || "Erro no servidor.");
        this.hideLoading();
      },
      complete: () => {
        if (!this.imagensNew || this.imagensNew.length === 0) {
          this.hideLoading();
        }
      }
    });
  }

  addBed() {
    if (!this.beds) {
      this.beds = [];
    }
    this.beds.push({ bedType: 0, quantity: 1 });
  }

  removeBed(index: number) {
    if (this.beds && this.beds.length > 0) {
      this.beds.splice(index, 1);
    }
  }
  uploadFotos(hotelId: string, quartoId: string) {
      console.log('=== UPLOAD FOTOS ===');
      console.log('hotelId recebido:', hotelId);
      console.log('quartoId recebido:', quartoId);
      console.log('Quantidade de imagens:', this.imagensNew.length);
      
      const formData = new FormData();

      this.imagensNew.forEach((file, index) => {
        console.log(`Adicionando arquivo ${index + 1}:`, file.name);
        formData.append('files', file);
      });
      
      
      if (hotelId && quartoId) {
        this.showLoading();
        console.log('Enviando fotos para:', { hotelId, quartoId });
        this.photosService.postPhotos(formData, hotelId, quartoId).subscribe({
          next: (response) => {
            console.log('Resposta upload fotos:', response);
            if(response.data && response.data.length > 0){
              this.toastr.success('Fotos enviadas com sucesso.');
            }
            this.hideLoading();
            this.router.navigate(['/admin']);
          },
          error: (error) => {
            console.error('Erro ao enviar fotos:', error);
            this.hideLoading();
            this.toastr.error(error.error?.mensagem || error.error?.excecaoMensagem || "Erro ao enviar fotos.");
          }
        });
      } else {
        console.error('hotelId ou quartoId não fornecido');
        this.toastr.error('Erro: IDs não fornecidos para upload de fotos.');
        this.hideLoading();
      }
    }

  getAllPhotos(quartoId: string) {
    this.photosService.getPhotosQuarto(quartoId).subscribe({
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
