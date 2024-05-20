import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  title = 'angular-rickandmortyapi';
  usuarioLogado:any;
  ano:any = new Date().getFullYear();
  constructor(private loginService: LoginService){
    this.usuarioLogado = this.buscarUsuario();
  }

  ngOnInit(){
    
  }

  buscarUsuario(){
    return this.loginService.buscarUsuario();
  }
}
