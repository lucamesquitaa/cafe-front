import { Component, Injector } from '@angular/core';
import { ComponentBase } from 'src/app/shared/components/component.base';
import { CafeteriaModel } from 'src/app/shared/models/cafeteria.model';
import { CafeteriaService } from 'src/app/shared/services/cafeteria.service';

@Component({
  selector: 'app-cafeterias-lista',
  standalone: false,
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent extends ComponentBase {

  cafeterias!: CafeteriaModel[];

  constructor(public override injector: Injector, private cafeteriaService: CafeteriaService) {
    super(injector);
  }

  override ngOnInit(): void {
    console.log('[ListaComponent] ngOnInit');
    this.doGetAllCafeterias();
  }

  doGetAllCafeterias(): void {
    console.log('[ListaComponent] doGetAllCafeterias chamado');
    this.showLoading();
    this.cafeteriaService.doGetAll().subscribe({
      next: (result) => {
        console.log('[ListaComponent] result=', result);
        this.cafeterias = result.data ?? [];
      },
      error: (err) => {
        console.error('[ListaComponent] error=', err);
        this.toastr.error(err.error?.mensagem || err.error?.excecaoMensagem || "Erro no servidor.");
      },
      complete: () => {
        console.log('[ListaComponent] complete, cafeterias.length=', this.cafeterias.length);
        this.hideLoading();
      }
    });
  }

  onNovaCafeteria(): void {
    this.router.navigate(['/cafeterias/novo']);
  }

  onEdit(id: string): void {
    this.router.navigate(['/cafeterias', id, 'editar']);
  }
}
