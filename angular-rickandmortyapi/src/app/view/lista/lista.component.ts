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
  generos!: string[];
  estados!: string[];
  especies!: string[];
  tipos!: string[];
  filteredCharacters!: Character[];
  responsiveOptions!:any[];
  largura!: number;

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
    this.filteredCharacters = [];
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

  alterarLargura():number {
    this.largura = window.innerWidth;
    return this.largura;
  }

  buscarUsuarioLogado():void{
    this.loginService.buscarUsuario();
  }

  personagensFiltrados(personagens: Character[], filtro: BuscarPersonagensFilter):void{
    this.filteredCharacters = this.filtrarPersonagens(personagens, filtro)
  }

  filtrarPersonagens(personagens: Character[], filtro: BuscarPersonagensFilter): Character[] {
    localStorage.setItem('buscarPersonagensFilter', JSON.stringify(this.filtro));
    const todosNulos = Object.values(filtro).every(valor => valor === null);

    if (todosNulos) {
      return personagens;
    }

    return personagens.filter((personagem:Character):boolean => {
      const correspondeGenero:boolean = filtro.genero ? personagem.gender === filtro.genero : true;
      const correspondeEstado:boolean = filtro.estado ? personagem.status === filtro.estado : true;
      const correspondeEspecie:boolean = filtro.especie ? personagem.species === filtro.especie : true;
      const correspondeTipo:boolean = filtro.tipo ? personagem.type === filtro.tipo : true;

      return correspondeGenero && correspondeEstado && correspondeEspecie && correspondeTipo;
    });
  }


  buscarPersonagens():void{
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

  buscarInformacoesPorIf(id:number):number{
    return id;
  }

}
