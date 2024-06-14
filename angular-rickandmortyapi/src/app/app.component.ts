import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  title = 'angular-rickandmortyapi';
  usuarioLogado:any;
  ano:any = new Date().getFullYear();
  constructor(){
    this.usuarioLogado = localStorage.getItem("buscaUsuarioFilter");
  }

  ngOnInit(){
    
  }

}
