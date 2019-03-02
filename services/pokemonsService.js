"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const HttpStatus = require("http-status");
const enviroment_1 = require("../infra/enviroment");
const helper_1 = require("../infra/helper");
const pokemon_model_1 = require("../models/pokemon.model");
class PokemonsService {
    constructor() {
        this.URL_GETALL = `${enviroment_1.default.url}/?limit=807`;
        this.URL_GETPOKEMON = `${enviroment_1.default.url}/`;
        this.pokemons = [];
    }
    getAllRest() {
        request(this.URL_GETALL, (err, res, body) => {
            let pokemons = JSON.parse(body).results;
            pokemons.forEach((element, index) => {
                if (index < 10) {
                    this.pokemons.push(new pokemon_model_1.Pokemon(index + 1, element.name, `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${index +
                        1}.png`));
                }
                if (index > 9 && index < 100) {
                    this.pokemons.push(new pokemon_model_1.Pokemon(index + 1, element.name, `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${index +
                        1}.png`));
                }
                if (index > 99) {
                    this.pokemons.push(new pokemon_model_1.Pokemon(index + 1, element.name, `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${index +
                        1}.png`));
                }
            });
        });
    }
    getPokemonbyId(id, req, ressponse) {
        request(`${this.URL_GETPOKEMON}${id}`, (err, res, body) => {
            let pokemon = JSON.parse(body);
            this.pokemon = pokemon;
            return this.res(req, ressponse);
        });
    }
    res(req, res) {
        return helper_1.default.sendResponse(res, HttpStatus.OK, this.getPokemon());
    }
    getPokemons() {
        return this.pokemons;
    }
    getPokemon() {
        return this.pokemon;
    }
}
exports.default = new PokemonsService();
