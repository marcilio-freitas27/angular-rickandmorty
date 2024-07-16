import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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

  login(user: string, pass: string):boolean{
    if(user === 'usuario' && pass !== ""){
      this.alterarUsuario(user);
      this.router.navigate(['']);
      return true;
    }else {
      return false;
    }
  }

  logout():void{
    localStorage.removeItem('buscaUsuarioFilter');
    this.router.navigate(['login']);
  }
}
