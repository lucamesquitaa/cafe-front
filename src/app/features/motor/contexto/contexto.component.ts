import { Component, inject, Injector, signal } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ComponentBase } from 'src/app/shared/components/component.base';
import { HoteisAllModel } from 'src/app/shared/models/hoteisAll.model';
import { DateRangeService } from 'src/app/shared/services/date-range.service';
import { HotelService } from 'src/app/shared/services/hotel.service';
import { MenubarService } from 'src/app/shared/services/menubar.service';

@Component({
  selector: 'app-contexto',
  standalone: false,
  templateUrl: './contexto.component.html',
  styleUrl: './contexto.component.scss'
})
export class ContextoComponent extends ComponentBase{
   hotel: { id: string | undefined } = { id: undefined };

   calendar = inject(NgbCalendar);
    hoveredDate: NgbDate | null = null;
    fromDate!: NgbDate | null;
    toDate!: NgbDate | null;
   
    startDate: string = '';
    endDate: string = '';
  
  filteredHoteis = signal<HoteisAllModel[]>([]);
  /**
   *
   */
  constructor(public override injector: Injector,
              private hotelService: HotelService,
              public menubarService: MenubarService,
              private dateRangeService: DateRangeService
  ) {
    super(injector);
    
  }

  doGetAllHoteis(){
    this.hotelService.doGetUserIdHoteis().subscribe({
      next: (result) => {
        const hoteis = result.data || [];
        this.filteredHoteis.set(hoteis);
        if (hoteis.length === 1) {
          this.hotel.id = hoteis[0].id;
        }
      },
    });
  }

  onHotelSelecionado(){
    console.log('Hotel selecionado:', this.hotel.id);
    if( this.hotel.id == undefined) return;

    this.dateRangeService.setDateRange(this.startDate, this.endDate);

    this.router.navigate(['/motor', this.hotel.id]);
  }
  

  override ngOnInit(): void {
    super.ngOnInit();
    this.doGetAllHoteis();
  }

  onDateSelection(date: NgbDate) {
      if (!this.fromDate && !this.toDate) {
        this.fromDate = date;
      } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
        this.toDate = date;
      } else {
        this.toDate = null;
        this.fromDate = date;
      }
  
        // Ensure UTC ISO strings to satisfy PostgreSQL 'timestamptz'
        const toIsoUtc = (d: NgbDate): string => {
          const jsDate = new Date(Date.UTC(d.year, d.month - 1, d.day, 0, 0, 0));
          return jsDate.toISOString();
        };
  
      this.startDate = toIsoUtc(this.fromDate);
      this.endDate = toIsoUtc(this.toDate ?? this.fromDate);
      
    }

    isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}
}
