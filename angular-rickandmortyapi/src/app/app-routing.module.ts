import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {AuthGuard} from './guard/auth.guard';
import {DashboardComponent} from './view/dashboard/dashboard.component';
import {ListaDetalhesComponent} from './view/lista/lista-detalhes/lista-detalhes.component';
import {ListaComponent} from './view/lista/lista.component';
import {LocalizacaoComponent} from './view/localizacoes/localizacao/localizacao.component';
import {LocalizacoesComponent} from './view/localizacoes/localizacoes.component';
import {LoginComponent} from './view/login/login.component';
import {PerfilComponent} from './view/perfil/perfil.component';
import { EpisodiosComponent } from './view/episodios/episodios.component';
import { EpisodioComponent } from './view/episodios/episodio/episodio.component';

const routes: Routes = [
  {   path :"", canActivate: [AuthGuard],
    children: [
      { path: "", component: DashboardComponent },
      { path: "character", component: ListaComponent},
      { path:"character/:id", component: ListaDetalhesComponent },
      { path: "location", component: LocalizacoesComponent},
      { path:"location/:id", component: LocalizacaoComponent },
      { path: "episode", component: EpisodiosComponent},
      { path:"episode/:id", component: EpisodioComponent },
      { path:"perfil", component: PerfilComponent },
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
