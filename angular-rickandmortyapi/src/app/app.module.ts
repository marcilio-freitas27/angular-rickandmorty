import {NgModule} from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {SharedModule} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';
import {ChartModule} from 'primeng/chart';
import {DataViewLayoutOptions,DataViewModule} from 'primeng/dataview';
import {DropdownModule} from 'primeng/dropdown';
import {PanelModule} from 'primeng/panel';
import {RatingModule} from 'primeng/rating';
import {TableModule} from 'primeng/table';
import {TagModule} from 'primeng/tag';
import {TooltipModule} from 'primeng/tooltip';

import {DashboardComponent} from './view/dashboard/dashboard.component';
import {FooterComponent} from './view/footer/footer.component';
import {ListaDetalhesComponent} from './view/lista/lista-detalhes/lista-detalhes.component';
import {ListaComponent} from './view/lista/lista.component';
import {LoginComponent} from './view/login/login.component';
import {MenuComponent} from './view/menu/menu.component';
import {PerfilComponent} from './view/perfil/perfil.component';
import {ToastComponent} from './view/toast/toast/toast.component';

import {NgSelectModule} from '@ng-select/ng-select';
import {EpisodioComponent} from './view/episodios/episodio/episodio.component';
import {EpisodiosComponent} from './view/episodios/episodios.component';
import {LocalizacaoComponent} from './view/localizacoes/localizacao/localizacao.component';
import {LocalizacoesComponent} from './view/localizacoes/localizacoes.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    LoginComponent,
    ListaDetalhesComponent,
    MenuComponent,
    PerfilComponent,
    DashboardComponent,
    FooterComponent,
    ToastComponent,
    LocalizacoesComponent,
    LocalizacaoComponent,
    EpisodiosComponent,
    EpisodioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DropdownModule,
    HttpClientModule,
    DataViewModule,
    RatingModule,
    TagModule,
    ButtonModule,
    CardModule,
    SharedModule,
    ChartModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    NgSelectModule,
    CarouselModule,
    TooltipModule,
    TableModule,
    ProgressSpinnerModule

  ],
  providers: [DataViewLayoutOptions],
  bootstrap: [AppComponent]
})
export class AppModule { }
