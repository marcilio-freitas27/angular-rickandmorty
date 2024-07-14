import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  url: string;
  static ENDPOINT:string = "character";

  constructor(public http: HttpClient) {
    this.url = "https://rickandmortyapi.com/api/";
  }

  buscarPersonagens():Observable<Character[]>{
    return this.http.get<Character[]>(this.url + ApiService.ENDPOINT);
  }

  buscarPersonagensPorId(id: number):Observable<Character>{
    return this.http.get<Character>(this.url + ApiService.ENDPOINT + "/" + id);
  }

}
