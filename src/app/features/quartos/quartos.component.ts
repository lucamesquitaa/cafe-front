import { Component, Injector, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/shared/components/component.base';
import { QuartosModel } from 'src/app/shared/models/quartos.model';
import { ResponseApi } from 'src/app/shared/models/response.api';
import { MenubarService } from 'src/app/shared/services/menubar.service';
import { QuartosService } from 'src/app/shared/services/quartos.service';

@Component({
  selector: 'app-quartos',
  standalone: false,
  templateUrl: './quartos.component.html',
  styleUrl: './quartos.component.scss'
})
export class QuartosComponent extends ComponentBase implements OnInit {

  hotelId!: string | null;

  allQuartos: QuartosModel[] = [];
  // Track collapsed state per quarto id
  collapsedMap: { [quartoId: string]: boolean } = {};

  constructor(
    public override injector: Injector,
    public menubarService: MenubarService,
    public quartosService: QuartosService
  ) {
    super(injector);
  }
 override ngOnInit(): void {
    super.ngOnInit();
    this.hotelId = this.activatedRoute.snapshot.paramMap.get('hotelId');
    // ou, para escutar mudanças:
    this.activatedRoute.paramMap.subscribe(params => {
      this.hotelId = params.get('hotelId');

      if(this.hotelId) {
        this.getAllQuartos(this.hotelId);
      }
        
    });
  }
  
  getAllQuartos(hotelId: string) {
    this.showLoading();
    this.quartosService.doGetQuartosByHotelId(hotelId).subscribe({
      next: (response: ResponseApi<QuartosModel[]>) => {
        console.log('Resposta da API:', response);
        if ((response.sucesso || response.success) && response.data) {
          this.allQuartos = response.data;
          console.log('Quartos carregados:', this.allQuartos);
        } else {
          this.allQuartos = [];
        }
      },
      error: (error) => {
        const errorMessage = error.error.mensagem || "Erro ao processar solicitação.";
          console.error('Erro na resposta:', errorMessage);
          this.toastr.error(errorMessage);
        this.allQuartos = [];
        this.hideLoading();
      },
      complete: () => {
        this.hideLoading();
      }
    });
  }

  // Collapse helpers
  toggleCollapsed(quartoId: string) {
    const key = String(quartoId);
    this.collapsedMap[key] = !this.collapsedMap[key];
  }

  isCollapsed(quartoId: string) {
    const key = String(quartoId);
    // default to false (expanded)
    return this.collapsedMap[key] ?? false;
  }

  // Alternation based on visible (not collapsed) items
  private getVisibleQuartos(): QuartosModel[] {
    return this.allQuartos.filter(q => !this.isCollapsed(q.id));
  }

  isVisibleIndexEven(quartoId: string): boolean {
    const visible = this.getVisibleQuartos();
    const idx = visible.findIndex(q => String(q.id) === String(quartoId));
    return idx % 2 === 0;
  }

  onEditQuarto(quartoId: string) {
    if (quartoId) {
      this.router.navigate(['/quartos/cadastro', quartoId]);
    } else {
      console.error('ID do quarto não fornecido');
      this.toastr.error('Erro: ID do quarto não encontrado');
    }
  }

  onDeleteQuarto(quartoId: string) {
    if (!this.hotelId) {
      console.error('ID do hotel não encontrado');
      this.toastr.error('Erro: ID do hotel não encontrado');
      return;
    }

    this.showLoading();
    this.quartosService.doDeleteQuarto(quartoId, this.hotelId!).subscribe({
      next: (response: ResponseApi) => {
        if (response.sucesso || response.success) {
          this.toastr.success('Quarto excluído com sucesso.');
          this.getAllQuartos(this.hotelId!);
        }
      },
      error: (error) => {
        const errorMessage = error.error.mensagem || "Erro ao processar solicitação.";
        console.error('Erro na exclusão:', errorMessage);
        this.toastr.error(errorMessage);
        this.hideLoading();
      },
      complete: () => {
        this.hideLoading();
      }
    });
  }

  bedLabel(bedType: number): string {
    const labels: Record<number, string> = { 1: 'Solteiro', 2: 'Beliche', 3: 'Casal', 4: 'Queen', 5: 'King', 6: 'Berço' };
    return labels[bedType] ?? `Tipo ${bedType}`;
  }

  onAddQuarto() {
    if (this.hotelId) {
      this.router.navigate(['/quartos/cadastro'], {
        queryParams: { hotelId: this.hotelId }
      });
    } else {
      console.error('ID do hotel não encontrado');
      this.toastr.error('Erro: ID do hotel não encontrado');
    }
  }
}
