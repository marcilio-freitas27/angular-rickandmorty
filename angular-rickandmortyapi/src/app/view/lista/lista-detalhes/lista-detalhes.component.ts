import {Location} from '@angular/common';
import {Component,OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Character} from 'src/app/models/character.model';
import {ApiService} from 'src/app/services/api.service';
import {LoginService} from 'src/app/services/login.service';
import {ToastUtil} from 'src/app/util/toast.util';

@Component({
  selector: 'app-lista-detalhes',
  templateUrl: './lista-detalhes.component.html',
  styleUrls: ['./lista-detalhes.component.css']
})

export class ListaDetalhesComponent implements OnInit {
  character!: Character;
  isLoading = true;
  constructor(
    private api: ApiService,
    private active: ActivatedRoute,
    private location: Location,
    private loginService: LoginService,
    public toast: ToastUtil
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
    this.simularCarregamento();
    this.buscarInformacoesPorId(Number(id));
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
          this.toast.carregarDadosFalha()
        }
      }
    )
  }

  voltar():void{
    this.location.back();
  }

  simularCarregamento() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); // Simula 2 segundos de carregamento
  }

}
