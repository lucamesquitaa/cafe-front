import { Component, Injector } from '@angular/core';
import { ComponentBase } from 'src/app/shared/components/component.base';
import { GetAllCafeteriasModel } from 'src/app/shared/models/get-all-cafeterias.model';
import { TypeCafeEnum, TypeCafeEnumLabel } from 'src/app/shared/models/type-cafe.enum';
import { MOCK_CAFETERIAS } from 'src/app/shared/mocks/cafeterias.mock';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends ComponentBase {

  cafeterias: GetAllCafeteriasModel[] = [];
  filteredCafeterias: GetAllCafeteriasModel[] = [];

  busca: string = '';

  userLat: number | null = null;
  userLng: number | null = null;

  constructor(public override injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    this.obterLocalizacao();
  }

  obterLocalizacao(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLat = position.coords.latitude;
          this.userLng = position.coords.longitude;
          this.doGetAllCafeterias();
        },
        () => {
          this.doGetAllCafeterias();
        }
      );
    } else {
      this.doGetAllCafeterias();
    }
  }

  // TODO: substituir pelo consumo real do endpoint GetAllCafeterias quando disponível
  doGetAllCafeterias(): void {
    this.showLoading();
    this.cafeterias = MOCK_CAFETERIAS;
    this.aplicarBusca();
    this.hideLoading();
  }

  aplicarBusca(): void {
    const termo = this.busca.trim().toLowerCase();
    this.filteredCafeterias = termo === ''
      ? this.cafeterias
      : this.cafeterias.filter((c) => c.nome.toLowerCase().includes(termo));
  }

  enderecoCompleto(cafeteria: GetAllCafeteriasModel): string {
    const partes = [cafeteria.endereco, cafeteria.numero];
    if (cafeteria.complemento) {
      partes.push(cafeteria.complemento);
    }
    return partes.filter(Boolean).join(', ');
  }

  categoriaLabel(categoria: TypeCafeEnum): string {
    return TypeCafeEnumLabel[categoria] ?? '';
  }

  verDetalhe(item: GetAllCafeteriasModel): void {
    this.router.navigate(['home', item.id]);
  }
}
