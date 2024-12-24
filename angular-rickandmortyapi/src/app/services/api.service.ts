import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Character} from '../models/character.model';
import {Episode} from '../models/episode.model';
import {Location} from '../models/location.model';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  url: string;
  static ENDPOINT:string = "character";
  static LOCATION:string = "location";
  static EPISODE:string = "episode";

  constructor(public http: HttpClient) {
    this.url = "https://rickandmortyapi.com/api/";
  }

  buscarPersonagens():Observable<Character[]>{
    return this.http.get<Character[]>(this.url + ApiService.ENDPOINT);
  }

  buscarPersonagensPorId(id: number):Observable<Character>{
    return this.http.get<Character>(this.url + ApiService.ENDPOINT + "/" + id);
  }

  buscarLocalizacoes():Observable<Location[]>{
    return this.http.get<Location[]>(this.url + ApiService.LOCATION);
  }

  buscarLocalizacoesPorId(id: number):Observable<Location>{
    return this.http.get<Location>(this.url + ApiService.LOCATION + "/" + id);
  }

  buscarEpisodios():Observable<Episode[]>{
    return this.http.get<Episode[]>(this.url + ApiService.EPISODE);
  }

  buscarEpisodiosPorId(id: number):Observable<Episode>{
    return this.http.get<Episode>(this.url + ApiService.EPISODE + "/" + id);
  }

  buscarPersonagemPorUrl(url: string): Observable<Character> {
    return this.http.get<Character>(url);
  }

}
