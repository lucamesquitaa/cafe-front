import { Component, Injector, OnInit } from '@angular/core';
import { ComponentBase } from '../component.base';
import { HotelService } from '../../services/hotel.service';
import { HoteisAllModel } from '../../models/hoteisAll.model';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends ComponentBase implements OnInit {
  public appTitle: string = 'Painel da Administração';
  public currentDate: Date = new Date();
  public hoteis: HoteisAllModel[] = [];
  public hotelSelecionadoId: string = '';

  constructor(
    public override injector: Injector,
    private hotelService: HotelService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.hotelSelecionadoId = this.cookieService.get('selected_hotel_id') || '';
    this.carregarHoteis();
  }

  carregarHoteis(): void {
    this.hotelService.doGetUserIdHoteis().subscribe({
      next: (response) => {
        this.hoteis = response.data ?? [];
        if (!this.hotelSelecionadoId && this.hoteis.length > 0) {
          this.selecionarHotel(this.hoteis[0].id);
        }
      },
      error: (err) => console.error('Erro ao carregar hotéis:', err)
    });
  }

  selecionarHotel(id: string): void {
    this.hotelSelecionadoId = id;
    const hotel = this.hoteis.find(h => h.id === id);
    this.cookieService.set('selected_hotel_id', id, { path: '/' });
    this.cookieService.set('selected_hotel_name', hotel?.name ?? '', { path: '/' });
  }

  
}
