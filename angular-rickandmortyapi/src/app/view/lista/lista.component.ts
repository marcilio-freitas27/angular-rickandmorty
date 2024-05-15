import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { BuscarPersonagensFilter } from 'src/app/models/filter/buscar-personagens.filter';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})


export class ListaComponent implements OnInit {

  characters!: Character[];
  layout: 'grid' | 'list' = 'list';
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

  constructor(private api: ApiService){
    this.characters = [];
    this.basicOptions = {};
    this.genero = [];
    this.generos = [];
    this.estados = [];
    this.especies = [];
    this.tipos = [];
    this.estado = [];
    this.filtro = {
      genero: "",
      estado: "",
      especie: "",
      tipo: ""
    }
  }

  ngOnInit(){
    this.buscarPersonagens();
    this.basicOptions = {
      plugins: {
          legend: {
              labels: {
                  color: ""
              }
          }
      },
      scales: {
          y: {
              beginAtZero: true,
              ticks: {
                  color: ""
              },
              grid: {
                  color: "",
                  drawBorder: false
              }
          },
          x: {
              ticks: {
                  color: ""
              },
              grid: {
                  color: "",
                  drawBorder: false
              }
          }
      }
    }
    if(localStorage.getItem('buscarPersonagensFilter') != null){
      this.filtro = JSON.parse(localStorage.getItem('buscarPersonagensFilter') || "");
    }
  }

  buscarPersonagensFiltro(){
    localStorage.setItem('buscarPersonagensFilter', JSON.stringify(this.filtro));
    let gender = this.characters.filter(char => char.gender === this.filtro.genero);
    console.log(gender)
    if(gender ){
      this.characters = this.characters.filter(char => char.gender === this.filtro.genero);
    }else {
      this.characters = [];
      this.generos = [];
      this.buscarPersonagens();

    }
  }
  buscarPersonagens(){
    this.api.buscarPersonagens().subscribe(
      {
        next: (data: any) => {
          this.characters = data.results;
          this.generos = ["Male","Female","Unknown"];
          let gender = this.genero;
          this.buscarGeneros();
          this.basicData = {
            labels: ["Male", "Female", "Unknown"],
            datasets: [
                {
                    label: 'Gender',
                    data: [gender[0].length,gender[1].length,gender[2].length],
                    backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1
                }
            ]
          };
          this.estados = ["Alive", "Dead", "Unknown"];
          let status = this.estado;
          this.buscarEstados();
          this.basicDataStatus = {
            labels: ["Alive", "Dead", "Unknown"],
            datasets: [
                {
                    label: 'Status',
                    data: [status[0].length,status[1].length,status[2].length],
                    backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1
                }
            ]
          };
          this.buscarEspecies();
          this.buscarTipos();
        },
        error: (err: any) => {
          console.log(err)
        }
      }
    )
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
      }else {
        unknown.push(this.characters[index].status);
      }
    }
    this.estado.push(alive,dead, unknown);
  }

  buscarEspecies(){
    for (let index = 0; index < this.characters.length; index++) {
      let species =  this.characters[index].species;
      // console.log(species);
    }
  }

  buscarTipos(){
    for (let index = 0; index < this.characters.length; index++) {
      let types =  this.characters[index].type;
      // console.log(types);
    }
  }

  buscarInformacoesPorIf(id:number){
    return id;
  }

}
