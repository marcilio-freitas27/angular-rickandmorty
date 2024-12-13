import { Character } from './character.model';
export interface Location{
  id:number;
  name:string;
  type:string;
  dimension:string;
  residents: Character[];
  url:string[];
  created:string;
}
