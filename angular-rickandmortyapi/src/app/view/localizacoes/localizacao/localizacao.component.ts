import {Location as locate} from '@angular/common';
import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {forkJoin} from 'rxjs';
import {Location} from 'src/app//models/location.model';
import {Character} from 'src/app/models/character.model';
import {ApiService} from 'src/app/services/api.service';
import {ToastUtil} from 'src/app/util/toast.util';

@Component({
  selector: 'app-localizacao',
  templateUrl: './localizacao.component.html',
  styleUrls: ['./localizacao.component.css']
})
export class LocalizacaoComponent {

  location: Location;
  residents: Character[];
  layout: string = 'list';
  isLoading = true;
  constructor(
    public apiService: ApiService,
     private active: ActivatedRoute,
     public locationService: locate,
     public toast: ToastUtil,
  ){
    this.residents = [];
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
    this.simularCarregamento();
    this.buscarLocalizacoesPorId(Number(id));
  }

  voltar():void{
    this.locationService.back();
  }

  buscarLocalizacoesPorId(id: number): void {
    this.apiService.buscarLocalizacoesPorId(id).subscribe({
      next: (data: Location) => {
        this.location = data;
        this.carregarResidentes();
      },
      error: (error) => {
        this.toast.carregarDadosFalha()
      }
    });
  }

  carregarResidentes(): void {
    const residentRequests = this.location.residents.map((url) =>
      this.apiService.buscarPersonagensPorUrl(url)
    );

    forkJoin(residentRequests).subscribe({
      next: (characters: Character[]) => {
        this.residents = characters;
      },
      error: (error) => {
        this.toast.carregarDadosFalha()
      }
    });
  }

  simularCarregamento() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); // Simula 2 segundos de carregamento
  }
}
