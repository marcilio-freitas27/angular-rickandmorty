import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import {CardModule} from 'primeng/card';
import { SharedModule } from 'primeng/api';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { CarouselModule } from 'primeng/carousel';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';

import { LoginComponent } from './view/login/login.component';
import { MenuComponent } from './view/menu/menu.component';
import { DashboardComponent } from './view/dashboard/dashboard.component'
import { ListaComponent } from './view/lista/lista.component';
import { ListaDetalhesComponent } from './view/lista/lista-detalhes/lista-detalhes.component';
import { PerfilComponent } from './view/perfil/perfil.component';


import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    LoginComponent,
    ListaDetalhesComponent,
    MenuComponent,
    PerfilComponent,
    DashboardComponent
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
    TableModule

  ],
  providers: [DataViewLayoutOptions],
  bootstrap: [AppComponent]
})
export class AppModule { }
