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
  name!: string;
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

  buscarLocationPorNome(name: string){
    this.apiService.buscarLocationPorNome(name).subscribe({
      next: (data: any) => {
        if(name){
          this.locations = data.results;
        }else{
          this.buscarLocalizacoes();
        }
      },
      error: (err) => {
        console.error(err.status,err.error.error);
        this.locations = [];
      }
    })
  }

}
