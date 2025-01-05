import {Component} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Location} from './../../models/location.model';
import {ToastUtil} from './../../util/toast.util';

@Component({
  selector: 'app-localizacoes',
  templateUrl: './localizacoes.component.html',
  styleUrls: ['./localizacoes.component.css']
})
export class LocalizacoesComponent {

  locations: Location[];
  cols!: any[];
  name!: string;
  page!: number;
  pages!:number;
  totalRecords: number = 0;
  loading: boolean = false;
  isLoading = false;
  constructor(
    public apiService: ApiService,
    public toast: ToastUtil,
  ){
    this.locations = [];
    this.page = 1;
    this.cols = [];
  }

  ngOnInit(){
    this.buscarLocationPorPagina(this.page);
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'residents', header: 'Residents' },
      { field: 'type', header: 'Type' },
      { field: 'dimension', header: 'Dimension' },
      { field: 'created', header: 'Created' }
    ];
  }

  buscarLocalizacoes():void{
    this.apiService.buscarLocalizacoes().subscribe(
      {
        next: (data: any) => {
          this.locations = data.results;
        },
        error: (err: any) => {
          console.error(err.status,err.error.error);
        }
      }
    )
  }

  buscarInformacoesPorId(id:number):number{
    return id;
  }

  buscarLocationPorNome(name: string){
    this.isLoading = true;
    this.simularCarregamento();
    this.apiService.buscarLocalizacoesPorNome(name).subscribe({
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

  buscarLocationPorPagina(page: number){
    this.apiService.buscarLocalizacoesPorPagina(page).subscribe({
      next: (data: any)=> {
        this.locations = data.results;
        this.totalRecords = data.info.count;
        this.pages = data.info.pages;
        this.toast.carregarDadosSucesso();
      },error: ()=>{
        this.toast.carregarDadosFalha();
      }
    })
  }

  buscarProximaPagina(page:number){
    if(page < this.pages){
      page += 1;
      this.page += 1;
    }
    this.buscarLocationPorPagina(page);
  }

  buscarPaginaAnterior(page:number){
    if(page > 1){
      page -= 1;
      this.page -= 1;
    }
    this.buscarLocationPorPagina(page);
  }

  simularCarregamento() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); // Simula 2 segundos de carregamento
  }


}
