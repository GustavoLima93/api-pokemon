
import * as request from "request";

import Enviroment from '../infra/enviroment'
import PokemonsController from '../controller/pokemonsController';

import { Pokemon } from "../models/pokemon.model";
import { PokemonDetails } from './../models/pokemonDetails.model';

class PokemonsService {
  private URL_GETALL: string = `${Enviroment.url}/?limit=807`;
  private URL_GETPOKEMON: string = `${Enviroment.url}/`;

  private pokemons: Pokemon[] = [];
  private pokemon: PokemonDetails;

  getAllRest() {
    request(this.URL_GETALL, (err, res, body) => {
      let pokemons = JSON.parse(body).results;
      pokemons ? pokemons.forEach((element, index) => {
        if (index < 10) {
          this.pokemons.push(
            new Pokemon(
              index + 1,
              element.name,
              `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${index +
              1}.png`
            )
          );
        }
        if (index > 9 && index < 100) {
          this.pokemons.push(
            new Pokemon(
              index + 1,
              element.name,
              `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${index +
              1}.png`
            )
          );
        }
        if (index > 99) {
          this.pokemons.push(
            new Pokemon(
              index + 1,
              element.name,
              `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${index +
              1}.png`
            )
          );
        }
      }) : err;
    });
  }

  getPokemonbyId(id: string, req, response) {
    request(`${this.URL_GETPOKEMON}${id}`, (err, res, body) => {

      if (body != 'Not Found') {
        let pokemon = JSON.parse(body);
        this.pokemon = new PokemonDetails();
        pokemon.types.forEach(element => {
          this.pokemon.tipo.push(element.type.name)
        });
        pokemon.stats.forEach(element => {
          this.pokemon.statusBase.push(element.base_stat)
          this.pokemon.statusName.push(element.stat.name)
        });
        this.pokemon.sprites.push(pokemon.sprites.front_default);
        this.pokemon.sprites.push(pokemon.sprites.front_shiny);
        this.pokemon.sprites.push(pokemon.sprites.back_default);
        this.pokemon.sprites.push(pokemon.sprites.back_shiny);
        this.pokemon.nome = pokemon.name;
        return PokemonsController.resById(req, response)

      } else {
        this.pokemon = new PokemonDetails();
        return PokemonsController.resById(req, response)
      }

    })
  }

  getPokemons() {
    return this.pokemons;
  }

  getPokemon() {
    return this.pokemon;
  }

}

export default new PokemonsService();
