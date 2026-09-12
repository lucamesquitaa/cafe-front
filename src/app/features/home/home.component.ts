import { Component, Injector } from '@angular/core';
import { ComponentBase } from 'src/app/shared/components/component.base';
import { CafeteriaModel } from 'src/app/shared/models/cafeteria.model';
import { CafeteriaService } from 'src/app/shared/services/cafeteria.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends ComponentBase {

  cafeterias: CafeteriaModel[] = [];
  filteredCafeterias: CafeteriaModel[] = [];

  busca: string = '';

  userLat: number | null = null;
  userLng: number | null = null;

  constructor(public override injector: Injector, private cafeteriaService: CafeteriaService) {
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

  doGetAllCafeterias(): void {
    this.showLoading();
    this.cafeteriaService.doGetAll(this.userLat ?? undefined, this.userLng ?? undefined).subscribe({
      next: (result) => {
        this.cafeterias = result.data ?? [];
        this.aplicarBusca();
      },
      error: () => {
        this.hideLoading();
      },
      complete: () => {
        this.hideLoading();
      }
    });
  }

  aplicarBusca(): void {
    const termo = this.busca.trim().toLowerCase();
    this.filteredCafeterias = termo === ''
      ? this.cafeterias
      : this.cafeterias.filter((c) => c.nome.toLowerCase().includes(termo));
  }

  distanciaKm(cafeteria: CafeteriaModel): number | null {
    if (this.userLat == null || this.userLng == null) return null;

    const R = 6371;
    const dLat = this.toRad(cafeteria.lat - this.userLat);
    const dLng = this.toRad(cafeteria.lng - this.userLng);
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(this.toRad(this.userLat)) * Math.cos(this.toRad(cafeteria.lat)) *
      Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(value: number): number {
    return value * Math.PI / 180;
  }

  verDetalhe(item: CafeteriaModel): void {
    this.router.navigate(['home', item.id]);
  }
}
