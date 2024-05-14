import { LocationCharacter } from "./location-characte.model";
import { OriginCharacter } from "./origin-character.model";

export interface Character{
  id:number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: OriginCharacter;
  location: LocationCharacter;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
