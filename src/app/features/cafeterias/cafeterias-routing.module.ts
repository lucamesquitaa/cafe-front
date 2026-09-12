import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { CadastroComponent } from './cadastro/cadastro.component';

const routes: Routes = [
  { path: '', component: ListaComponent },
  { path: 'novo', component: CadastroComponent },
  { path: ':id/editar', component: CadastroComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CafeteriasRoutingModule { }
