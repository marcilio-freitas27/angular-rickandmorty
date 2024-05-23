import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuarioLogado:any
  usuarioImagem!: string;
  menuImagem!: string;
  constructor(
    private loginService: LoginService,
    private api: ApiService,
  ) {

   }

  ngOnInit() {
    this.usuarioLogado = this.buscarUsuario();
    this.buscarImagens();
    
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

  logout(){
    localStorage.clear();
  }


}
