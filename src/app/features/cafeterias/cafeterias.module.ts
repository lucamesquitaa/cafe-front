import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { CafeteriasRoutingModule } from './cafeterias-routing.module';
import { ListaComponent } from './lista/lista.component';
import { CadastroCafeteriaComponent } from './cadastro-cafeteria/cadastro-cafeteria.component';

@NgModule({
  declarations: [ListaComponent, CadastroCafeteriaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    CafeteriasRoutingModule,
  ]
})
export class CafeteriasModule { }
