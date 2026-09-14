import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { CadastroCafeteriaComponent } from './cadastro-cafeteria/cadastro-cafeteria.component';

const routes: Routes = [
  { path: '', component: ListaComponent },
  { path: 'novo', component: CadastroCafeteriaComponent },
  { path: 'cadastrar', component: CadastroCafeteriaComponent },
  { path: ':id/editar', component: CadastroCafeteriaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CafeteriasRoutingModule { }
