import { Component, Injector, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/shared/components/component.base';
import { CafeteriaModel } from 'src/app/shared/models/cafeteria.model';
import { CafeteriaService } from 'src/app/shared/services/cafeteria.service';

@Component({
  selector: 'app-cafeteria-detalhe',
  standalone: false,
  templateUrl: './detalhe.component.html',
  styleUrl: './detalhe.component.scss'
})
export class DetalheComponent extends ComponentBase implements OnInit {
  cafeteria: CafeteriaModel | undefined;

  constructor(public override injector: Injector, private cafeteriaService: CafeteriaService) {
    super(injector);
  }

  override ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) return;

    this.showLoading();
    this.cafeteriaService.doGetById(id).subscribe({
      next: (result) => {
        this.cafeteria = result.data;
      },
      error: () => {
        this.hideLoading();
      },
      complete: () => {
        this.hideLoading();
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/home']);
  }
}
