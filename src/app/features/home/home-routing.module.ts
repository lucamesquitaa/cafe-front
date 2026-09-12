import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DetalheComponent } from './detalhe/detalhe.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':id', component: DetalheComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
