import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Character } from 'src/app/models/character.model';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-lista-detalhes',
  templateUrl: './lista-detalhes.component.html',
  styleUrls: ['./lista-detalhes.component.css']
})

export class ListaDetalhesComponent implements OnInit {
  character!: Character;

  constructor(
    private api: ApiService,
    private active: ActivatedRoute,
    private location: Location,
    private loginService: LoginService,
    private router: Router
  ) {
      this.character = {
        id: 1,
        name:"",
        status:"",
        species:"",
        type:"",
        gender:"",
        origin: {
          name: "",
          url:""
        },
        location: {
          name: "",
          url:""
        },
        image:"",
        episode: [],
        url:"",
        created:"",
      }
    }

  ngOnInit() {
    this.buscarUsuarioLogado();
    let id = this.active.snapshot.paramMap.get('id');
    this.buscarInformacoesPorId(Number(id));
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  buscarUsuarioLogado(){
    return this.loginService.buscarUsuario();
  }

  buscarInformacoesPorId(id: number):void{
    this.api.buscarPersonagensPorId(id).subscribe(
      {
        next: (data: any) => {
          this.character = data;
        },
        error: (err: any) => {
          console.log(err)
        }
      }
    )
  }

  voltar():void{
    this.location.back();
  }

}
