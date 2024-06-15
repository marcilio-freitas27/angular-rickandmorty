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
  generos!: string[];
  estados!: string[];
  especies!: string[];
  tipos!: string[];

  genero!: number[];
  estado!: number[];
  especie!: number[];
  tipo!: number[];

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
    this.basicData = this.chartUtil.gerarChart(this.generos,'Gender',this.buscarGeneros());

    this.estados = ["Alive", "Dead", "Unknown"];
    this.basicDataStatus = this.chartUtil.gerarChart(this.estados,'Status',this.buscarEstados());

    this.especies = ["Human","Alien"];
    this.basicDataEspecies = this.chartUtil.gerarChart(this.especies,'Specie',this.buscarEspecies());

    this.tipos = ["Genetic experiment","Super Human","Parasite","Human with antennae","Human with ant in his eyes","Vazio"]
    this.basicDataTipos = this.chartUtil.gerarChart(this.tipos,'Type',this.buscarTipos());
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
    return this.genero;
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
    return this.estado;
  }

  buscarEspecies(){
    let human = 0;
    let alien = 0;
    for (let index = 0; index < this.characters.length; index++) {
      this.characters[index].species == "Human" ? human += 1 : alien += 1;
    }
    this.especie.push(human,alien);
    return this.especie;
  }

  buscarTipos(){
    let geneticExperiment = 0;
    let superHuman = 0;
    let parasite = 0;
    let humanAntennae = 0;
    let humanEyeAnts = 0;
    let vazio = 0;
    for (let index = 0; index < this.characters.length; index++) {
      let types = ["Human with antennae","Human with ant in his eyes","Genetic experiment","Super Human","Parasite"]
      let increment = [() => { humanAntennae += 1; },() => { humanEyeAnts += 1; },() => { geneticExperiment += 1; },() => { superHuman += 1; },() => { parasite += 1; }]
      const typeCounters:any = {};
      types.forEach((type, index) => {
        typeCounters[type] = increment[index];
      });

      const incrementCounter = typeCounters[this.characters[index].type] || (() => { vazio += 1; });
      incrementCounter();  
    }
    
    this.tipo.push(geneticExperiment,vazio,superHuman,parasite,humanAntennae,humanEyeAnts)
    return this.tipo;
  }

}
