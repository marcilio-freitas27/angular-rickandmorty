import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuarioLogado!:string | null;
  usuarioImagem!: string;
  menuImagem!: string;
  constructor(
    private loginService: LoginService,
    private api: ApiService,
    private router: Router,
  ) {

   }

  ngOnInit() {
    this.usuarioLogado = this.buscarUsuario();
    this.buscarImagens();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    
  }

  buscarImagens(){
    this.api.buscarPersonagensPorId(1).subscribe({
      next: (res) => this.usuarioImagem = res.image
    })
    this.api.buscarPersonagensPorId(19).subscribe({
      next: (res) => this.menuImagem = res.image
    })
  }

  buscarUsuario(){
    return this.loginService.buscarUsuario();
  }

  logout():void{
    localStorage.clear();
    this.router.navigate(["login"]);
  }


}
