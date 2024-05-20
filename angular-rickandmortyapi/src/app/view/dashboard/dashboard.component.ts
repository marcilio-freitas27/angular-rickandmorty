import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { ApiService } from 'src/app/services/api.service';
import { ChartUtil } from 'src/app/util/chart.util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  characters!: Character[];
  generos!: any[];
  estados!: any[];
  especies!: any[];
  tipos!: any[];

  genero!: any[];
  estado!: any[];
  especie!: any[];
  tipo!: any[];

  basicOptions: any;
  basicData: any;
  basicDataStatus: any;
  basicDataEspecies: any;
  basicDataTipos: any;
  responsiveOptions!:any[];
  constructor(
    public chartUtil: ChartUtil,
    private api: ApiService,
  ) { 
    this.characters = [];
    this.basicOptions = {};
    this.genero = [];
    this.estado = [];
    this.especie = [];
    this.tipo = [];
    this.estado = [];
  }

  ngOnInit() {
    this.buscarPersonagens();
    this.basicOptions = this.chartUtil.basicOptions;
    this.responsiveOptions = this.chartUtil.responsiveOptions;
  }

  buscarPersonagens(){
    this.api.buscarPersonagens().subscribe(
      {
        next: (data: any) => {
          this.characters = data.results;
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

}
