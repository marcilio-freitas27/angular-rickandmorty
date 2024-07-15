import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { ApiService } from 'src/app/services/api.service';
import { ChartUtil } from 'src/app/util/chart.util';
import { ToastUtil } from 'src/app/util/toast.util';
import { DataUtil } from './../../util/data.util';
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
    public dataUtil:DataUtil,
  ) { 
    this.characters = [];
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
    this.dataGenero = this.chartUtil.gerarChart(this.generos,'Gender',this.dataUtil.buscarGeneros(this.characters));
    console.log(this.dataGenero)
    this.optionsGenero = this.chartUtil.gerarOptions("Gêneros");

    this.estados = ["Alive", "Dead", "Unknown"];
    this.dataEstado = this.chartUtil.gerarChart(this.estados,'Status',this.dataUtil.buscarEstados(this.characters));
    this.optionsEstado = this.chartUtil.gerarOptions("Estados");
    
    this.especies = ["Human","Alien"];
    this.dataEspecie = this.chartUtil.gerarChart(this.especies,'Specie',this.dataUtil.buscarEspecies(this.characters));
    this.optionsEspecie = this.chartUtil.gerarOptions("Espécies");
    
    this.tipos = [
      "Genetic experiment",
      "Superhuman (Ghost trains summoner)",
      "Parasite",
      "Human with antennae",
      "Human with ants in his eyes",
      "Vazio"
    ]
    this.dataTiposGerais = this.chartUtil.gerarChart(this.tipos,'Type',this.dataUtil.buscarTipos(this.characters));
    this.optionsTiposGerais = this.chartUtil.gerarOptions("Tipos Gerais");
  }

 

}
