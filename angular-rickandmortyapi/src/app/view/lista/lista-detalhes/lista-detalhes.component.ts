import { OriginCharacter } from './../../../models/origin-character.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/models/character.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-lista-detalhes',
  templateUrl: './lista-detalhes.component.html',
  styleUrls: ['./lista-detalhes.component.css']
})

export class ListaDetalhesComponent implements OnInit {
  character!: Character;

  constructor(
    private api: ApiService,
    private active: ActivatedRoute
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
    let id = this.active.snapshot.paramMap.get('id');
    this.buscarInformacoesPorId(Number(id))
  }

  buscarInformacoesPorId(id: number){
    this.api.buscarPersonagensPorId(id).subscribe(
      {
        next: (data: any) => {
          this.character = data;
        },
        error: (err: any) => {
          console.log(err)
        }
      }
    )
  }

}
