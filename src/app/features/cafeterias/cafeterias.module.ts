import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CafeteriasRoutingModule } from './cafeterias-routing.module';
import { ListaComponent } from './lista/lista.component';
import { CadastroComponent } from './cadastro/cadastro.component';

@NgModule({
  declarations: [ListaComponent, CadastroComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CafeteriasRoutingModule,
  ]
})
export class CafeteriasModule { }
