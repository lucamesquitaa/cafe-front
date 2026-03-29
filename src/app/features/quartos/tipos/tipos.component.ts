import { Component, inject, Injector, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentBase } from 'src/app/shared/components/component.base';
import { CategoryQuartosModel } from 'src/app/shared/models/categoryQuartos.model';
import { CategoryQuartosService } from 'src/app/shared/services/category.quartos.service';
import { QuartosService } from 'src/app/shared/services/quartos.service';
import { MenubarService } from 'src/app/shared/services/menubar.service';
import { ResponseApi } from 'src/app/shared/models/response.api';
import { CadastroTipoQuartoComponent } from './cadastro-tipo/cadastro-tipo.component';

@Component({
  selector: 'app-tipos-quarto',
  standalone: false,
  templateUrl: './tipos.component.html',
  styleUrl: './tipos.component.scss'
})
export class TipoQuartoComponent extends ComponentBase implements OnInit {
  hotelId!: string;
  allTipos: CategoryQuartosModel[] = [];

  // Massa form state
  showMassaPanel = false;
  massaDto = {
    tipoQuartoId: '',
    modoGeracao: 'range' as 'range' | 'lista',
    rangeInicio: null as number | null,
    rangeFim: null as number | null,
    listaManual: '' ,
    andar: ''
  };
  massaErros: string[] = [];

  private modalService = inject(NgbModal);

  constructor(
    public override injector: Injector,
    public menubarService: MenubarService,
    private categoryService: CategoryQuartosService,
    private quartosService: QuartosService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.activatedRoute.paramMap.subscribe(params => {
      this.hotelId = params.get('hotelId') || this.cookieService.get('hotel_id');
      if (this.hotelId) {
        this.loadTipos();
      }
    });
  }

  loadTipos(): void {
    this.showLoading();
    this.categoryService.doGetCategoryQuartosByHotelId(this.hotelId).subscribe({
      next: (res: ResponseApi<CategoryQuartosModel[]>) => {
        this.allTipos = (res.sucesso || res.success) && res.data ? res.data : [];
      },
      error: (err: any) => {
        this.toastr.error(err.error?.mensagem || 'Erro ao carregar tipos.');
        this.hideLoading();
      },
      complete: () => this.hideLoading()
    });
  }

  openCadastroModal(tipo?: CategoryQuartosModel): void {
    const ref = this.modalService.open(CadastroTipoQuartoComponent, { size: 'lg', centered: true });
    ref.componentInstance.hotelId = this.hotelId;
    if (tipo?.id) {
      ref.componentInstance.tipoId = tipo.id;
    }
    ref.result.then(
      () => this.loadTipos(),
      () => {}
    );
  }

  onDelete(tipo: CategoryQuartosModel): void {
    if (!confirm(`Excluir o tipo "${tipo.name}"? Esta ação não pode ser desfeita.`)) return;
    this.showLoading();
    this.categoryService.doDeleteCategoryQuarto(tipo.id!).subscribe({
      next: (res: ResponseApi) => {
        if (res.sucesso || res.success) {
          this.toastr.success('Tipo excluído com sucesso.');
          this.loadTipos();
        } else {
          this.toastr.error(res.mensagem || 'Erro ao excluir.');
          this.hideLoading();
        }
      },
      error: (err: any) => {
        this.toastr.error(err.error?.mensagem || err.error?.excecaoMensagem || 'Erro no servidor.');
        this.hideLoading();
      }
    });
  }

  bedLabel(bedType: number): string {
    const labels: Record<number, string> = { 1: 'Solteiro', 2: 'Beliche', 3: 'Casal', 4: 'Queen', 5: 'King', 6: 'Berço' };
    return labels[bedType] ?? `Tipo ${bedType}`;
  }

  // Criação em Massa
  onCriarMassa(): void {
    this.massaErros = [];
    if (!this.massaDto.tipoQuartoId) {
      this.massaErros.push('Selecione um tipo de quarto.');
      return;
    }

    let dto: any = {
      tipoQuartoId: this.massaDto.tipoQuartoId,
      modoGeracao: this.massaDto.modoGeracao,
      andar: this.massaDto.andar || null
    };

    if (this.massaDto.modoGeracao === 'lista') {
      const nums = this.massaDto.listaManual
        .split(',')
        .map(s => parseInt(s.trim(), 10))
        .filter(n => !isNaN(n));
      if (nums.length === 0) {
        this.massaErros.push('Informe ao menos um número válido na lista.');
        return;
      }
      dto.listaManual = nums;
    } else {
      if (!this.massaDto.rangeInicio || !this.massaDto.rangeFim) {
        this.massaErros.push('Informe o início e fim do range.');
        return;
      }
      dto.rangeInicio = this.massaDto.rangeInicio;
      dto.rangeFim = this.massaDto.rangeFim;
    }

    this.showLoading();
    this.quartosService.doPostQuartosMassa(this.hotelId, dto).subscribe({
      next: (res: ResponseApi) => {
        if (res.sucesso || res.success) {
          const data: any = res.data;
          this.toastr.success(`${data?.criados ?? 0} quarto(s) criado(s) com sucesso.`);
          this.showMassaPanel = false;
          this.resetMassaForm();
        } else {
          const data: any = res.data;
          const conflitos = data?.conflitos?.length ? ` Conflitos: ${data.conflitos.join(', ')}` : '';
          this.toastr.error((res.mensagem || res.message || 'Erro ao criar quartos.') + conflitos);
        }
      },
      error: (err: any) => {
        this.toastr.error(err.error?.mensagem || err.error?.excecaoMensagem || 'Erro no servidor.');
        this.hideLoading();
      },
      complete: () => this.hideLoading()
    });
  }

  private resetMassaForm(): void {
    this.massaDto = {
      tipoQuartoId: '',
      modoGeracao: 'range',
      rangeInicio: null,
      rangeFim: null,
      listaManual: '',
      andar: ''
    };
    this.massaErros = [];
  }
}
