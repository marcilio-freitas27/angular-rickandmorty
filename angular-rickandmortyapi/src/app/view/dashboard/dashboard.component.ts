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
    let genderList:any[] = [gender[0],gender[1],gender[2]]
    this.basicData = this.chartUtil.gerarChart(this.generos,'Gender',genderList)

    this.estados = ["Alive", "Dead", "Unknown"];
    this.buscarEstados();
    let status = this.estado;
    let statusList:any[] = [status[0],status[1],status[2]]
    this.basicDataStatus = this.chartUtil.gerarChart(this.estados,'Status',statusList)

    this.especies = ["Human","Alien"];
    this.buscarEspecies();
    let species = this.especie;
    let speciesList:any[] = [species[0],species[1]]
    this.basicDataEspecies = this.chartUtil.gerarChart(this.especies,'Specie',speciesList);

    this.tipos = ["Genetic experiment","Super Human","Parasite","Human with antennae","Human with ant in his eyes","Vazio"]
    this.buscarTipos();
    let type = this.tipo;
    let typeList:any[] = [type[0],type[1],type[2],type[3],type[4],type[5]]
    this.basicDataTipos = this.chartUtil.gerarChart(this.tipos,'Type',typeList)
  }

  buscarGeneros(){
    let male = 0;
    let female = 0;
    let unknown = 0;
    for (let index = 0; index < this.characters.length; index++) {
      let gender =  this.characters[index].gender;
      gender == "Male" ? male += 1 : (gender == "Female" ? female += 1 : unknown += 1);
    }
    this.genero.push(male,female, unknown);
  }

  buscarEstados(){
    let alive = 0;
    let dead =  0
    let unknown = 0;
    for (let index = 0; index < this.characters.length; index++) {
      let status =  this.characters[index].status;
      status == "Alive" ? alive += 1 : (status == "Dead" ? dead += 1 : unknown += 1);
    }
    this.estado.push(alive,dead, unknown);
  }

  buscarEspecies(){
    let human = 0;
    let alien = 0;
    for (let index = 0; index < this.characters.length; index++) {
      let species =  this.characters[index].species;
      species == "Human" ? human += 1 : alien += 1;
    }
    this.especie.push(human,alien);
  }

  buscarTipos(){
    let geneticExperiment = 0;
    let superHuman = 0;
    let parasite = 0;
    let humanAntennae = 0;
    let humanEyeAnts = 0;
    let vazio = 0;
    for (let index = 0; index < this.characters.length; index++) {
      let types =  this.characters[index].type;
      let ultimosTipos = (types == "Human with antennae" ? humanAntennae += 1 : (types == "Human with ant in his eyes" ? humanEyeAnts += 1 : vazio += 1));
      types == "Genetic experiment" ? geneticExperiment += 1 : (types == "Super Human" ? superHuman +=1 : (types == "Parasite" ? parasite += 1 : ultimosTipos))
    }
    this.tipo.push(geneticExperiment,vazio,superHuman,parasite,humanAntennae,humanEyeAnts)
  }

}
