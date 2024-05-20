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

  alterarUsuario(usuario:any){
    localStorage.setItem('buscaUsuarioFilter',usuario);
  }

  login(user: any, pass: any){
    if(user === 'usuario' && pass !== ""){
      this.alterarUsuario(user);
      this.router.navigate(['']);
    }
  }

  logout(){
    localStorage.removeItem('buscaUsuarioFilter');
    this.router.navigate(['login']);
  }
}
