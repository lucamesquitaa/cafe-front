import { Component, Injector, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/shared/components/component.base';
import { CafeteriaInputModel } from 'src/app/shared/models/cafeteria.model';
import { CafeteriaService } from 'src/app/shared/services/cafeteria.service';
import { CoordenadasService } from 'src/app/shared/services/coordenadas.service';

@Component({
  selector: 'app-cafeterias-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent extends ComponentBase implements OnInit {

  cafeteriaId: string | null = null;

  item: CafeteriaInputModel = {
    nome: '',
    endereco: '',
    lat: 0,
    lng: 0,
    categoriaPrincipal: '',
    fotoUrl: '',
  };

  errorList: string[] = [];

  constructor(
    public override injector: Injector,
    private cafeteriaService: CafeteriaService,
    private coordenadasService: CoordenadasService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.cafeteriaId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.cafeteriaId) {
      this.showLoading();
      this.cafeteriaService.doGetById(this.cafeteriaId).subscribe({
        next: (result) => {
          if (result.data) {
            this.item = {
              nome: result.data.nome,
              endereco: result.data.endereco,
              lat: result.data.lat,
              lng: result.data.lng,
              categoriaPrincipal: result.data.categoriaPrincipal,
              fotoUrl: result.data.fotoUrl,
            };
          }
        },
        error: (err) => {
          this.toastr.error(err.error?.mensagem || err.error?.excecaoMensagem || "Erro no servidor.");
          this.hideLoading();
        },
        complete: () => {
          this.hideLoading();
        }
      });
    }
  }

  buscarCoordenadas(): void {
    if (!this.item.endereco) {
      this.toastr.error('Informe o endereço antes de buscar as coordenadas.');
      return;
    }

    this.showLoading();
    this.coordenadasService.buscarCoordenadas(this.item.endereco).subscribe({
      next: (res) => {
        if (res.status === 'OK' && res.results?.length > 0) {
          const location = res.results[0].geometry.location;
          this.item.lat = location.lat;
          this.item.lng = location.lng;
        } else {
          this.toastr.error('Não foi possível localizar o endereço informado.');
        }
      },
      error: () => {
        this.toastr.error('Erro ao buscar coordenadas.');
      },
      complete: () => {
        this.hideLoading();
      }
    });
  }

  onValida(): boolean {
    this.errorList = [];

    if (!this.item.nome || this.item.nome.trim() === '') {
      this.errorList.push('O campo Nome é obrigatório.');
    }
    if (!this.item.endereco || this.item.endereco.trim() === '') {
      this.errorList.push('O campo Endereço é obrigatório.');
    }
    if (!this.item.categoriaPrincipal || this.item.categoriaPrincipal.trim() === '') {
      this.errorList.push('O campo Categoria é obrigatório.');
    }
    if (!this.item.lat || !this.item.lng) {
      this.errorList.push('Latitude e Longitude são obrigatórias.');
    }

    return this.errorList.length === 0;
  }

  salvar(): void {
    if (!this.onValida()) return;

    this.showLoading();
    const request = this.cafeteriaId
      ? this.cafeteriaService.doUpdate(this.cafeteriaId, this.item)
      : this.cafeteriaService.doCreate(this.item);

    request.subscribe({
      next: () => {
        this.toastr.success('Cafeteria salva com sucesso.');
        this.router.navigate(['/cafeterias']);
      },
      error: (err) => {
        this.toastr.error(err.error?.mensagem || err.error?.excecaoMensagem || "Erro no servidor.");
        this.hideLoading();
      },
      complete: () => {
        this.hideLoading();
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/cafeterias']);
  }
}
