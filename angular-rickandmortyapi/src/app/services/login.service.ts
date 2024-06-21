import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public router:Router) { }

  buscarUsuario(){
    return localStorage.getItem('buscaUsuarioFilter');
  }

  alterarUsuario(usuario:any):void{
    localStorage.setItem('buscaUsuarioFilter',usuario);
  }

  login(user: string, pass: string):void{
    if(user === 'usuario' && pass !== ""){
      this.alterarUsuario(user);
      this.router.navigate(['']);
    }
  }

  logout():void{
    localStorage.removeItem('buscaUsuarioFilter');
    this.router.navigate(['login']);
  }
}
