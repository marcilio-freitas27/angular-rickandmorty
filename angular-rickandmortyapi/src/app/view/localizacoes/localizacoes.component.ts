import {Component} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Location} from './../../models/location.model';

@Component({
  selector: 'app-localizacoes',
  templateUrl: './localizacoes.component.html',
  styleUrls: ['./localizacoes.component.css']
})
export class LocalizacoesComponent {

  locations: Location[];
  constructor(
    public apiService: ApiService,
  ){
    this.locations = [];
  }

  ngOnInit(){
    this.buscarLocalizacoes();
  }

  buscarLocalizacoes():void{
    this.apiService.buscarLocalizacoes().subscribe(
      {
        next: (data: any) => {
          this.locations = data.results;
        },
        error: (err: any) => {

        }
      }
    )
  }

  buscarInformacoesPorIf(id:number):number{
    return id;
  }

}
