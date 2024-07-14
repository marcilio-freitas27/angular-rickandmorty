import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { ApiService } from 'src/app/services/api.service';
import { ChartUtil } from 'src/app/util/chart.util';
import { ToastUtil } from 'src/app/util/toast.util';
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

  optionsGenero: any;
  optionsTiposGerais: any;
  optionsEstado: any;
  optionsEspecie: any;

  dataGenero: any;
  dataEstado: any;
  dataEspecie: any;
  dataTiposGerais: any;
  responsiveOptions!:any[];
  constructor(
    public chartUtil: ChartUtil,
    public toastUtil: ToastUtil,
    private api: ApiService,
  ) { 
    this.characters = [];
    this.genero = [];
    this.estado = [];
    this.especie = [];
    this.tipo = [];
    this.estado = [];
  }

  ngOnInit() {
    this.buscarPersonagens();
    this.responsiveOptions = this.chartUtil.responsiveOptions;
  }


  buscarPersonagens():void{
    this.api.buscarPersonagens().subscribe(
      {
        next: (data: any) => {
          this.characters = data.results;
          this.gerarGraficos();
          this.toastUtil.carregarDadosSucesso();
        },
        error: (err: any) => {
          this.toastUtil.carregarDadosFalha();
        }
      }
    )
  }

  gerarGraficos():void {
    this.generos = ["Male","Female","Unknown"];
    this.dataGenero = this.chartUtil.gerarChart(this.generos,'Gender',this.buscarGeneros());
    this.optionsGenero = this.chartUtil.gerarOptions("Gêneros");

    this.estados = ["Alive", "Dead", "Unknown"];
    this.dataEstado = this.chartUtil.gerarChart(this.estados,'Status',this.buscarEstados());
    this.optionsEstado = this.chartUtil.gerarOptions("Estados");
    
    this.especies = ["Human","Alien"];
    this.dataEspecie = this.chartUtil.gerarChart(this.especies,'Specie',this.buscarEspecies());
    this.optionsEspecie = this.chartUtil.gerarOptions("Espécies");
    
    this.tipos = [
      "Genetic experiment",
      "Superhuman (Ghost trains summoner)",
      "Parasite",
      "Human with antennae",
      "Human with ants in his eyes",
      "Vazio"
    ]
    this.dataTiposGerais = this.chartUtil.gerarChart(this.tipos,'Type',this.buscarTipos());
    this.optionsTiposGerais = this.chartUtil.gerarOptions("Tipos Gerais");
  }

  buscarGeneros():number[]{
    let male = 0;
    let female = 0;
    let unknown = 0;
    this.characters.forEach((char) => {
      char.gender == "Male" ? male += 1 : (char.gender == "Female" ? female += 1 : unknown += 1);
    })
    this.genero.push(male,female, unknown);
    return this.genero;
  }

  buscarEstados():number[]{
    let alive = 0;
    let dead =  0
    let unknown = 0;
    this.characters.forEach((char) => {
      char.status == "Alive" ? alive += 1 : (char.status == "Dead" ? dead += 1 : unknown += 1);
    })
    this.estado.push(alive,dead, unknown);
    return this.estado;
  }

  buscarEspecies():number[]{
    let human = 0;
    let alien = 0;
    this.characters.forEach((char) => {
      char.species == "Human" ? human += 1 : alien += 1;
    })
    this.especie.push(human,alien);
    return this.especie;
  }

  buscarTipos():number[]{
    let geneticExperiment = 0;
    let superHuman = 0;
    let parasite = 0;
    let humanAntennae = 0;
    let humanEyeAnts = 0;
    let vazio = 0;
    this.characters.forEach((char) => {
      let types = [
        "Human with antennae",
        "Human with ants in his eyes",
        "Genetic experiment",
        "Superhuman (Ghost trains summoner)",
        "Parasite", 
        ""
      ]
      let increment = [
        () => { humanAntennae += 1; },
        () => { humanEyeAnts += 1; },
        () => { geneticExperiment += 1; },
        () => { superHuman += 1; },
        () => { parasite += 1; }
      ]
      const typeCounters:any = {};
      types.forEach((type, index) => {
        typeCounters[type] = increment[index];
      });

      const incrementCounter = typeCounters[char.type] || (() => { vazio += 1; });
      incrementCounter();  
    })
    
    this.tipo.push(geneticExperiment,superHuman,parasite,humanAntennae,humanEyeAnts,vazio)
    return this.tipo;
  }

}
