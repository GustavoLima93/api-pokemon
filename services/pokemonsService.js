"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const enviroment_1 = require("../infra/enviroment");
const pokemonsController_1 = require("../controller/pokemonsController");
const pokemon_model_1 = require("../models/pokemon.model");
const pokemonDetails_model_1 = require("./../models/pokemonDetails.model");
class PokemonsService {
    constructor() {
        this.URL_GETALL = `${enviroment_1.default.url}/?limit=807`;
        this.URL_GETPOKEMON = `${enviroment_1.default.url}/`;
        this.pokemons = [];
    }
    getAllRest() {
        request(this.URL_GETALL, (err, res, body) => {
            let pokemons = JSON.parse(body).results;
            pokemons ? pokemons.forEach((element, index) => {
                if (index <= 10) {
                    this.pokemons.push(new pokemon_model_1.Pokemon(index + 1, element.name, `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${index +
                        1}.png`));
                }
                if (index > 9 && index <= 100) {
                    this.pokemons.push(new pokemon_model_1.Pokemon(index + 1, element.name, `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${index +
                        1}.png`));
                }
                if (index > 99) {
                    this.pokemons.push(new pokemon_model_1.Pokemon(index + 1, element.name, `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${index +
                        1}.png`));
                }
            }) : err;
        });
    }
    getPokemonbyId(id, req, response) {
        request(`${this.URL_GETPOKEMON}${id}`, (err, res, body) => {
            if (body != 'Not Found') {
                let pokemon = JSON.parse(body);
                this.pokemon = new pokemonDetails_model_1.PokemonDetails();
                pokemon.types.forEach(element => {
                    this.pokemon.tipo.push(element.type.name);
                });
                pokemon.stats.forEach(element => {
                    this.pokemon.statusBase.push(element.base_stat);
                    this.pokemon.statusName.push(element.stat.name);
                });
                this.pokemon.sprites.push(pokemon.sprites.front_default);
                this.pokemon.sprites.push(pokemon.sprites.front_shiny);
                this.pokemon.sprites.push(pokemon.sprites.back_default);
                this.pokemon.sprites.push(pokemon.sprites.back_shiny);
                this.pokemon.nome = pokemon.name;
                return pokemonsController_1.default.resById(req, response);
            }
            else {
                this.pokemon = new pokemonDetails_model_1.PokemonDetails();
                return pokemonsController_1.default.resById(req, response);
            }
        });
    }
    getPokemons() {
        return this.pokemons;
    }
    getPokemon() {
        return this.pokemon;
    }
}
exports.default = new PokemonsService();
