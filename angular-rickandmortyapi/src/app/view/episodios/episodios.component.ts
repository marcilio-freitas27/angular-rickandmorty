import {Component} from '@angular/core';
import {getEpisodes} from 'rickmortyapi';
import {ApiService} from 'src/app/services/api.service';
import {Episode} from './../../models/episode.model';
import {ToastUtil} from './../../util/toast.util';

@Component({
  selector: 'app-episodios',
  templateUrl: './episodios.component.html',
  styleUrls: ['./episodios.component.css']
})
export class EpisodiosComponent {

  episodes: Episode[];
  cols!: any[];
  page!: number;
  pages!:number;
  totalRecords: number = 0;
  loading: boolean = false;
  isLoading = false;
  constructor(
    public apiService: ApiService,
    public toast: ToastUtil,){
    this.episodes = [];
    this.page = 1;
    this.cols = [];
  }

  ngOnInit(){
    this.buscarEpisodiosViaApiJs();
    this.buscarEpisodiosPorPagina(this.page);
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'air_date', header: 'Air Date' },
      { field: 'episode', header: 'Episode' },
      { field: 'characters', header: 'Characters' },
      { field: 'created', header: 'Created' }
    ];
  }

  async buscarEpisodiosViaApiJs(): Promise<void> {
    try {
      const response = await getEpisodes();
      this.episodes = response.data.results || [];
    } catch (error) {
      console.error('Erro ao buscar episódios:', error);
    }
  }

  buscarEpisodiosPorPagina(page: number){
    this.apiService.buscarEpisodiosPorPagina(page).subscribe({
      next: (data: any)=> {
        this.episodes = data.results;
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
    this.buscarEpisodiosPorPagina(page);
  }

  buscarPaginaAnterior(page:number){
    if(page > 1){
      page -= 1;
      this.page -= 1;
    }
    this.buscarEpisodiosPorPagina(page);
  }

  simularCarregamento() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); // Simula 2 segundos de carregamento
  }

}
