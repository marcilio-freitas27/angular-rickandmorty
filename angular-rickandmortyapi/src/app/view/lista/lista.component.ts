import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { BuscarPersonagensFilter } from 'src/app/models/filter/buscar-personagens.filter';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';
import { ChartUtil } from 'src/app/util/chart.util';
import { FilterService } from 'primeng/api';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})


export class ListaComponent implements OnInit {

  characters!: Character[];
  genero!: any[];
  estado!: any[];
  especie!: any[];
  tipo!: any[];
  basicOptions: any;
  basicData: any;
  basicDataStatus: any;
  filtro!: BuscarPersonagensFilter;
  generos!: any[];
  estados!: any[];
  especies!: any[];
  tipos!: any[];
  filteredCharacters!: Character[];
  dadosFiltro!: any[];
  responsiveOptions!:any[];
  basicDataEspecies: any;
  basicDataTipos: any;

  constructor(
    private api: ApiService,
    private loginService: LoginService,
    public chartUtil: ChartUtil,
  private filterService: FilterService){
    this.characters = [];
    this.basicOptions = {};
    this.genero = [];
    this.generos = [];
    this.estados = [];
    this.estado = [];
    this.especies = [];
    this.especie = [];
    this.tipos = [];
    this.tipo = [];
    this.estado = [];
    this.filtro = {
      genero: "",
      estado: "",
      especie: "",
      tipo: ""
    }
    this.dadosFiltro = [this.filtro]
  }

  ngOnInit(){
    this.buscarUsuarioLogado();
    this.buscarPersonagens();
    this.basicOptions = this.chartUtil.basicOptions;

    if(localStorage.getItem('buscarPersonagensFilter') != null){
      this.filtro = JSON.parse(localStorage.getItem('buscarPersonagensFilter') || "");
    }

    this.responsiveOptions = this.chartUtil.responsiveOptions;
  }

  buscarUsuarioLogado(){
    this.loginService.buscarUsuario();
  }

  personagensFiltrados(personagens: Character[], filtro: BuscarPersonagensFilter){
    this.filteredCharacters = this.filtrarPersonagens(personagens, filtro)
  }

  filtrarPersonagens(personagens: Character[], filtro: BuscarPersonagensFilter): Character[] {
    // Verificar se todos os valores do filtro são nulos
    localStorage.setItem('buscarPersonagensFilter', JSON.stringify(this.filtro));
    const todosNulos = Object.values(filtro).every(valor => valor === null);

    if (todosNulos) {
      // Se todos os valores do filtro forem nulos, retornar todos os personagens
      return personagens;
    }

    // Filtrar os personagens com base nos critérios do filtro
    return personagens.filter(personagem => {
      // Verificar se o personagem corresponde a todos os critérios não nulos do filtro
      const correspondeGenero = filtro.genero ? personagem.gender === filtro.genero : true;
      const correspondeEstado = filtro.estado ? personagem.status === filtro.estado : true;
      const correspondeEspecie = filtro.especie ? personagem.species === filtro.especie : true;
      const correspondeTipo = filtro.tipo ? personagem.type === filtro.tipo : true;

      // Retornar verdadeiro se todos os critérios forem atendidos
      return correspondeGenero && correspondeEstado && correspondeEspecie && correspondeTipo;
    });
  }


  buscarPersonagens(){
    this.api.buscarPersonagens().subscribe(
      {
        next: (data: any) => {
          this.characters = data.results;
          this.filteredCharacters = data.results;
          this.gerarGraficos();
        },
        error: (err: any) => {
          console.log(err)
        }
      }
    )
  }
  gerarGraficos() {
    this.generos = ["Male","Female","Unknown"];
    this.buscarGeneros();
    let gender = this.genero;
    let genderList:any[] = [gender[0].length,gender[1].length,gender[2].length]
    this.basicData = this.chartUtil.gerarChart(this.generos,'Gender',genderList)

    this.estados = ["Alive", "Dead", "Unknown"];
    this.buscarEstados();
    let status = this.estado;
    let statusList:any[] = [status[0].length,status[1].length,status[2].length]
    this.basicDataStatus = this.chartUtil.gerarChart(this.estados,'Status',statusList)

    this.especies = ["Human","Alien"];
    this.buscarEspecies();
    let species = this.especie;
    let speciesList:any[] = [species[0].length,species[1].length]
    this.basicDataEspecies = this.chartUtil.gerarChart(this.especies,'Specie',speciesList);

    this.tipos = ["Genetic experiment","Super Human","Parasite","Human with antennae","Human with ant in his eyes","Vazio"]
    this.buscarTipos();
    let type = this.tipo;
    let typeList:any[] = [type[0].length,type[1].length,type[2].length,type[3].length,type[4].length,type[5].length]
    this.basicDataTipos = this.chartUtil.gerarChart(this.tipos,'Type',typeList)
  }

  buscarGeneros(){
    let male = [];
    let female = [];
    let unknown = [];
    for (let index = 0; index < this.characters.length; index++) {
      let gender =  this.characters[index].gender;
      if(gender == "Male"){
        male.push(this.characters[index].gender);
      } else if(gender == "Female"){
        female.push(this.characters[index].gender);
      }else {
        unknown.push(this.characters[index].gender);
      }
    }
    this.genero.push(male,female, unknown);
  }

  buscarEstados(){
    let alive = [];
    let dead = [];
    let unknown = [];
    for (let index = 0; index < this.characters.length; index++) {
      let status =  this.characters[index].status;
      if(status == "Alive"){
        alive.push(this.characters[index].status);
      } else if(status == "Dead"){
        dead.push(this.characters[index].status);
      }else if(status == "unknown"){
        unknown.push(this.characters[index].status);
      }
    }
    this.estado.push(alive,dead, unknown);
  }

  buscarEspecies(){
    let human = [];
    let alien = [];
    for (let index = 0; index < this.characters.length; index++) {
      let species =  this.characters[index].species;
      if(species == "Human"){
        human.push(this.characters[index].species);
      }else {
        alien.push(this.characters[index].species);
      }
    }

    this.especie.push(human,alien);
  }

  buscarTipos(){
    let geneticExperiment = [];
    let superHuman = [];
    let parasite = [];
    let humanAntennae = [];
    let humanEyeAnts = [];
    let vazio = [];
    for (let index = 0; index < this.characters.length; index++) {
      let types =  this.characters[index].type;
      if(types == "Genetic experiment"){
        geneticExperiment.push(this.characters[index].type);
      }else if(types == "Super Human"){
        superHuman.push(this.characters[index].type);
      }else if(types == "Parasite"){
        parasite.push(this.characters[index].type);
      }else if(types == "Human with antennae"){
        humanAntennae.push(this.characters[index].type);
      }else if(types == "Human with ant in his eyes"){
        humanEyeAnts.push(this.characters[index].type);
      }
      else {
        vazio.push(this.characters[index].type);
      }
    }
    this.tipo.push(geneticExperiment,vazio,superHuman,parasite,humanAntennae,humanEyeAnts)
  }

  buscarInformacoesPorIf(id:number){
    return id;
  }

}
