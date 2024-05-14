import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  url: string;
  static ENDPOINT:string = "character";

  constructor(public http: HttpClient) {
    this.url = "https://rickandmortyapi.com/api/";
  }

  buscarPersonagens(){
    return this.http.get<any[]>(this.url + ApiService.ENDPOINT);
  }

  buscarPersonagensPorId(id: number){
    return this.http.get<any>(this.url + ApiService.ENDPOINT + "/" + id);
  }

}
