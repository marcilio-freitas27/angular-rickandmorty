import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { BuscarPersonagensFilter } from 'src/app/models/filter/buscar-personagens.filter';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';
import { ChartUtil } from 'src/app/util/chart.util';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})


export class ListaComponent implements OnInit {

  characters!: Character[];

  filtro!: BuscarPersonagensFilter;
  generos!: any[];
  estados!: any[];
  especies!: any[];
  tipos!: any[];
  filteredCharacters!: Character[];
  dadosFiltro!: any[];
  responsiveOptions!:any[];
  largura: any;

  constructor(
    private api: ApiService,
    private loginService: LoginService,
    public chartUtil: ChartUtil){
    this.characters = [];
    this.generos = [];
    this.estados = [];
    this.especies = [];
    this.tipos = [];
    this.filtro = new BuscarPersonagensFilter();
    this.dadosFiltro = [this.filtro]
  }

  ngOnInit(){
    this.buscarUsuarioLogado();
    this.buscarPersonagens();

    if(localStorage.getItem('buscarPersonagensFilter') != null){
      this.filtro = JSON.parse(localStorage.getItem('buscarPersonagensFilter') || "");
    }
    this.filtrarPersonagens(this.characters, this.filtro)
    this.responsiveOptions = this.chartUtil.responsiveOptions;
    this.generos = ["Male","Female","unknown"];
    this.estados = ["Alive", "Dead", "unknown"];
    this.especies = ["Human","Alien"];
    this.tipos = ["Genetic experiment","Superhuman (Ghost trains summoner)","Parasite","Human with antennae","Human with ants in his eyes",""];
    this.alterarLargura();
    this.largura = this.alterarLargura();
    window.addEventListener("resize", this.alterarLargura);
  }

  alterarLargura(){
    this.largura = window.innerWidth;
    return this.largura;
  }

  buscarUsuarioLogado(){
    this.loginService.buscarUsuario();
  }

  personagensFiltrados(personagens: Character[], filtro: BuscarPersonagensFilter){
    this.filteredCharacters = this.filtrarPersonagens(personagens, filtro)
  }

  filtrarPersonagens(personagens: Character[], filtro: BuscarPersonagensFilter): Character[] {
    localStorage.setItem('buscarPersonagensFilter', JSON.stringify(this.filtro));
    const todosNulos = Object.values(filtro).every(valor => valor === null);

    if (todosNulos) {
      return personagens;
    }

    return personagens.filter(personagem => {
      const correspondeGenero = filtro.genero ? personagem.gender === filtro.genero : true;
      const correspondeEstado = filtro.estado ? personagem.status === filtro.estado : true;
      const correspondeEspecie = filtro.especie ? personagem.species === filtro.especie : true;
      const correspondeTipo = filtro.tipo ? personagem.type === filtro.tipo : true;

      return correspondeGenero && correspondeEstado && correspondeEspecie && correspondeTipo;
    });
  }


  buscarPersonagens(){
    this.api.buscarPersonagens().subscribe(
      {
        next: (data: any) => {
          this.characters = data.results;
          this.filteredCharacters = data.results;
          this.personagensFiltrados(data.results, this.filtro);
        },
        error: (err: any) => {
          console.log(err)
        }
      }
    )
  }

  buscarInformacoesPorIf(id:number){
    return id;
  }

}
