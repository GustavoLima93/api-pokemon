import * as request from "request";
import * as HttpStatus from 'http-status';

import Enviroment from '../infra/enviroment';
import Helper from '../infra/helper';

import { Pokemon } from "../models/pokemon.model";

class PokemonsService {
  private URL_GETALL: string = `${Enviroment.url}/?limit=807`;
  private URL_GETPOKEMON: string = `${Enviroment.url}/`;
  
  private pokemons: Pokemon[] = [];
  private pokemon: any;

  getAllRest() {
    request(this.URL_GETALL, (err, res, body) => {
      let pokemons = JSON.parse(body).results;
      pokemons.forEach((element, index) => {
        if (index < 10) {
          this.pokemons.push(
            new Pokemon(
              index+1,
              element.name,
              `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${index +
                1}.png`
            )
          );
        }
        if (index > 9 && index < 100) {
          this.pokemons.push(
            new Pokemon(
              index+1,
              element.name,
              `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${index +
                1}.png`
            )
          );
        }
        if (index > 99) {
          this.pokemons.push(
            new Pokemon(
              index+1,
              element.name,
              `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${index +
                1}.png`
            )
          );
        }
      });
    });
  }

  getPokemonbyId(id:string,req,ressponse) {
    request(`${this. URL_GETPOKEMON}${id}`, (err, res, body) => {
      let pokemon =  JSON.parse(body)
      this.pokemon = pokemon;
      return this.res(req, ressponse)
    })
  }

  res(req, res) {    
    return Helper.sendResponse(res, HttpStatus.OK, this.getPokemon())
  } 

  getPokemons() {
    return this.pokemons;
  }

  getPokemon() {
    return this.pokemon;
  }

}

export default new PokemonsService();
