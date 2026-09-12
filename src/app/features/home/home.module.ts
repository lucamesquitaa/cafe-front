import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [HomeComponent, DetalheComponent],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    SharedModule
  ],
})
export class HomeModule { }
