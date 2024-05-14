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

import { ListaComponent } from './view/lista/lista.component';

import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent
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
    NgSelectModule
  ],
  providers: [DataViewLayoutOptions],
  bootstrap: [AppComponent]
})
export class AppModule { }
