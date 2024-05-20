import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuarioLogado:any
  constructor(private router: Router,
    private loginService: LoginService
  ) {

   }

  ngOnInit() {
    this.usuarioLogado = this.buscarUsuario();
  }

  buscarUsuario(){
    return this.loginService.buscarUsuario();
  }

  logout(){
    this.loginService.logout();
  }


}
