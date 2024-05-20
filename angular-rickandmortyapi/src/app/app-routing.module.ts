import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './view/lista/lista.component';
import { ListaDetalhesComponent } from './view/lista/lista-detalhes/lista-detalhes.component';
import { LoginComponent } from './view/login/login.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {   path :"", canActivate: [AuthGuard],
    children: [
      { path:"", component: ListaComponent },
      { path:"character/:id", component: ListaDetalhesComponent },
    ]
  },
  { path:"login", component: LoginComponent },
  { path: "**", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
