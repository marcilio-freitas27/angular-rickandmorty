import {Location as locate} from '@angular/common';
import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from 'src/app/services/api.service';
import {Location} from './../../../models/location.model';

@Component({
  selector: 'app-localizacao',
  templateUrl: './localizacao.component.html',
  styleUrls: ['./localizacao.component.css']
})
export class LocalizacaoComponent {

  location: Location;
  constructor(
    public apiService: ApiService,
     private active: ActivatedRoute,
     public locationService: locate,
  ){
    this.location = {
      id: 1,
      name: "",
      type: "",
      dimension: "",
      residents: [],
      url: [],
      created: "",
    }
  }

  ngOnInit(){
    let id = this.active.snapshot.paramMap.get('id');
    this.buscarLocalizacoesPorId(Number(id));
  }

  buscarLocalizacoesPorId(id: number): void{
    this.apiService.buscarLocalizacoesPorId(id).subscribe(
      {
        next: (data:any) => {
          this.location = data;
        },
        error: (error) => {

        }
      }
    )
  }

  voltar():void{
    this.locationService.back();
  }
}
