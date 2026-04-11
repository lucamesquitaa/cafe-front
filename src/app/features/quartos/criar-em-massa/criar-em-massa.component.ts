import { Component, EventEmitter, inject, Injector, Input, OnInit, Output } from '@angular/core';
import { ComponentBase } from 'src/app/shared/components/component.base';
import { CategoryQuartosModel } from 'src/app/shared/models/categoryQuartos.model';
import { CategoryQuartosService } from 'src/app/shared/services/category.quartos.service';
import { QuartosService } from 'src/app/shared/services/quartos.service';
import { ResponseApi } from 'src/app/shared/models/response.api';

@Component({
  selector: 'app-criar-em-massa',
  standalone: false,
  templateUrl: './criar-em-massa.component.html',
  styleUrls: ['./criar-em-massa.component.scss']
})
export class CriarEmMassaComponent extends ComponentBase {
  @Input() hotelId!: string;
  @Output() quartosCriados = new EventEmitter<void>();

  showPanel = false;
  allTipos: CategoryQuartosModel[] = [];

  massaDto = {
    tipoQuartoId: '',
    modoGeracao: 'range' as 'range' | 'lista',
    rangeInicio: null as number | null,
    rangeFim: null as number | null,
    listaManual: '',
    andar: ''
  };
  massaErros: string[] = [];

  private categoryService = inject(CategoryQuartosService);
  private quartosService = inject(QuartosService);

  constructor(public override injector: Injector) {
    super(injector);
  }

  togglePanel(): void {
    this.showPanel = !this.showPanel;
    if (this.showPanel && this.allTipos.length === 0) {
      this.loadTipos();
    }
  }

  private loadTipos(): void {
    this.categoryService.doGetCategoryQuartosByHotelId(this.hotelId).subscribe({
      next: (res: ResponseApi<CategoryQuartosModel[]>) => {
        this.allTipos = (res.sucesso || res.success) && res.data ? res.data : [];
      },
      error: () => {}
    });
  }

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
          this.showPanel = false;
          this.resetForm();
          this.quartosCriados.emit();
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

  cancelar(): void {
    this.showPanel = false;
    this.resetForm();
  }

  private resetForm(): void {
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
