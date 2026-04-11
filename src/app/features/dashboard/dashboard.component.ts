import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentBase } from 'src/app/shared/components/component.base';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends ComponentBase implements OnInit {

  hotelId!: string | null;

  constructor(
    public override injector: Injector,
  ) {
    super(injector);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.hotelId = this.cookieService.get("selected_hotel_id");
    if(this.activatedRoute.snapshot.paramMap.get('hotelId')){
      this.hotelId = this.activatedRoute.snapshot.paramMap.get('hotelId');
      // ou, para escutar mudanças:
      this.activatedRoute.paramMap.subscribe(params => {
        this.hotelId = params.get('hotelId');
      
        if (this.hotelId) {
          
        }
      });
    }
  }
}
