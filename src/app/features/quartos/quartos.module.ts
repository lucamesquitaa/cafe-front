import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuartosRoutingModule } from './quartos-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuartosComponent } from './quartos.component';
import { CadastroQuartoComponent } from './cadastro/cadastro.component';
import { TipoQuartoComponent } from './tipos/tipos.component';
import { CadastroTipoQuartoComponent } from './tipos/cadastro-tipo/cadastro-tipo.component';


@NgModule({
  declarations: [
    QuartosComponent,
    CadastroQuartoComponent,
    TipoQuartoComponent,
    CadastroTipoQuartoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    QuartosRoutingModule
  ]
})
export class QuartosModule { }
