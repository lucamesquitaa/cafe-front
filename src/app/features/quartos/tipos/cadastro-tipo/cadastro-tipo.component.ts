import { Component, inject, Input, Injector, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentBase } from 'src/app/shared/components/component.base';
import { CategoryQuartosModel, ConfiguracaoCamaDTO } from 'src/app/shared/models/categoryQuartos.model';
import { CategoryQuartosService } from 'src/app/shared/services/category.quartos.service';
import { ResponseApi } from 'src/app/shared/models/response.api';

@Component({
  selector: 'app-cadastro-tipo-quarto',
  standalone: false,
  templateUrl: './cadastro-tipo.component.html',
  styleUrl: './cadastro-tipo.component.scss'
})
export class CadastroTipoQuartoComponent extends ComponentBase implements OnInit {
  @Input() hotelId!: string;
  @Input() tipoId?: string;
  @Input() nomePre?: string;

  activeModal = inject(NgbActiveModal);

  item: CategoryQuartosModel = { name: '', minHospedes: 1, maxHospedes:2  };
  beds: ConfiguracaoCamaDTO[] = [];
  errorList: string[] = [];
  isEdit = false;

  constructor(
    public override injector: Injector,
    private categoryService: CategoryQuartosService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    if (this.nomePre) {
      this.item.name = this.nomePre;
    }
    if (this.tipoId) {
      this.isEdit = true;
      this.loadTipo();
    }
  }

  private loadTipo(): void {
    this.showLoading();
    this.categoryService.doGetCategoryQuartoById(this.tipoId!).subscribe({
      next: (res: ResponseApi<CategoryQuartosModel>) => {
        if (res.data) {
          this.item = res.data;
          this.beds = this.item.configuracaoCamas ? [...this.item.configuracaoCamas] : [];
        }
      },
      error: (err: any) => {
        this.toastr.error(err.error?.mensagem || 'Erro ao carregar tipo de quarto.');
        this.hideLoading();
      },
      complete: () => this.hideLoading()
    });
  }

  addBed(): void {
    this.beds.push({ bedType: 1, quantity: 1 });
  }

  removeBed(index: number): void {
    this.beds.splice(index, 1);
  }

  private validate(): boolean {
    this.errorList = [];
    if (!this.item.name?.trim()) {
      this.errorList.push('Nome é obrigatório.');
    }
    if (
      this.item.minHospedes != null &&
      this.item.maxHospedes != null &&
      this.item.minHospedes > this.item.maxHospedes
    ) {
      this.errorList.push('Mín. Hóspedes não pode ser maior que Máx. Hóspedes.');
    }
    return this.errorList.length === 0;
  }

  onSalvar(): void {
    if (!this.validate()) return;

    this.item.configuracaoCamas = this.beds.map(b => ({
      bedType: Number(b.bedType),
      quantity: Number(b.quantity)
    }));

    this.showLoading();

    const req = this.isEdit
      ? this.categoryService.doPutCategoryQuarto(this.tipoId!, this.item)
      : this.categoryService.doPostCategoryQuarto(this.item, this.hotelId);

    req.subscribe({
      next: (res: ResponseApi) => {
        if (res.sucesso || res.success) {
          this.toastr.success(this.isEdit ? 'Tipo atualizado com sucesso.' : 'Tipo cadastrado com sucesso.');
          this.activeModal.close(res.data ?? this.item);
        } else {
          this.toastr.error(res.mensagem || res.message || 'Erro ao salvar.');
        }
      },
      error: (err: any) => {
        this.toastr.error(err.error?.mensagem || err.error?.excecaoMensagem || 'Erro no servidor.');
        this.hideLoading();
      },
      complete: () => this.hideLoading()
    });
  }
}
