import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { BuscarPersonagensFilter } from 'src/app/models/filter/buscar-personagens.filter';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';
import { ChartUtil } from 'src/app/util/chart.util';
import { ToastUtil } from 'src/app/util/toast.util';

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
    public chartUtil: ChartUtil,
    public toast: ToastUtil,
  ){
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

  async personagensFiltrados(personagens: Character[], filtro: BuscarPersonagensFilter):Promise<void>{
    // let time = setTimeout(()=>{
    //   let buscarSpinner = document.getElementById("buscarFiltro") as HTMLElement;
    //   let body = document.getElementById("body") as HTMLElement;
    //   buscarSpinner.style.display = "flex";
    //   buscarSpinner.style.justifyContent = "center";
    //   buscarSpinner.style.zIndex = "2";
    //   body.style.zIndex = "1";
    //   body.style.backgroundColor = "rgba(0,0,0,0.2)";
    // }, 5);
    
    await new Promise(resolve => setTimeout(resolve, 10));
    this.filteredCharacters = this.filtrarPersonagens(personagens, filtro)
    // clearTimeout(time);
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
          // this.personagensFiltrados(data.results, this.filtro);
          this.toast.carregarDadosSucesso();
        },
        error: (err: any) => {
          this.toast.carregarDadosFalha()
        }
      }
    )
  }

  buscarInformacoesPorIf(id:number):number{
    return id;
  }

}
