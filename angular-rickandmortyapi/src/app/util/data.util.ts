import { Injectable } from "@angular/core";
import { Character } from './../models/character.model';

@Injectable({
  providedIn: 'root'
})

export class DataUtil {

    buscarGeneros(characters: Character[]):number[]{
        let male = 0;
        let female = 0;
        let unknown = 0;
        characters.forEach((char) => {
          char.gender == "Male" ? male += 1 : (char.gender == "Female" ? female += 1 : unknown += 1);
        })
        
        return [male,female, unknown];
      }
    
      buscarEstados(characters: Character[]):number[]{
        let alive = 0;
        let dead =  0
        let unknown = 0;
        characters.forEach((char) => {
          char.status == "Alive" ? alive += 1 : (char.status == "Dead" ? dead += 1 : unknown += 1);
        })
        
        return [alive,dead, unknown];
      }
    
      buscarEspecies(characters: Character[]):number[]{
        let human = 0;
        let alien = 0;
        characters.forEach((char) => {
          char.species == "Human" ? human += 1 : alien += 1;
        })
        
        return [human,alien];
      }
    
      buscarTipos(characters: Character[]):number[]{
        let geneticExperiment = 0;
        let superHuman = 0;
        let parasite = 0;
        let humanAntennae = 0;
        let humanEyeAnts = 0;
        let vazio = 0;
        characters.forEach((char) => {
          let types = [
            "Human with antennae",
            "Human with ants in his eyes",
            "Genetic experiment",
            "Superhuman (Ghost trains summoner)",
            "Parasite", 
            ""
          ]
          let increment = [
            () => { humanAntennae += 1; },
            () => { humanEyeAnts += 1; },
            () => { geneticExperiment += 1; },
            () => { superHuman += 1; },
            () => { parasite += 1; }
          ]
          const typeCounters:any = {};
          types.forEach((type, index) => {
            typeCounters[type] = increment[index];
          });
    
          const incrementCounter = typeCounters[char.type] || (() => { vazio += 1; });
          incrementCounter();  
        })
        
        return [geneticExperiment,superHuman,parasite,humanAntennae,humanEyeAnts,vazio]
      }
}
