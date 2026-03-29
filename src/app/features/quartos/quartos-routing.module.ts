import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuartosComponent } from './quartos.component';
import { CadastroQuartoComponent } from './cadastro/cadastro.component';
import { TipoQuartoComponent } from './tipos/tipos.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'cadastro', component: CadastroQuartoComponent },
  { path: 'cadastro/:quartoId', component: CadastroQuartoComponent },
  { path: 'tipos/:hotelId', component: TipoQuartoComponent },
  { path: ':hotelId', component: QuartosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuartosRoutingModule { }
