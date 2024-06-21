import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  title:string = 'angular-rickandmortyapi';
  usuarioLogado:any;
  ano:number = new Date().getFullYear();
  constructor(){
    this.usuarioLogado = localStorage.getItem("buscaUsuarioFilter");
  }

  ngOnInit(){
    
  }

}
