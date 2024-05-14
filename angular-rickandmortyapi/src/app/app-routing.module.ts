import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './view/lista/lista.component';
import { ListaDetalhesComponent } from './view/lista/lista-detalhes/lista-detalhes.component';

const routes: Routes = [
  { path:"", component: ListaComponent },
  { path:"character/:id", component: ListaDetalhesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
