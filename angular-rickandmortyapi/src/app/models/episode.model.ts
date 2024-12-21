import {Character} from './character.model';

export interface Episode {
  id:number;
  name:string;
  air_date:string;
  episode:string;
  characters:Character[];
  url:string;
  created:string;
}
