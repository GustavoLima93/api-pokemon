"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status");
const pokemonsService_1 = require("../services/pokemonsService");
const helper_1 = require("../infra/helper");
class PokemonsController {
    startRest() {
        pokemonsService_1.default.getAllRest();
    }
    get(req, res) {
        if (pokemonsService_1.default.getPokemons().length) {
            return helper_1.default.sendResponse(res, HttpStatus.OK, pokemonsService_1.default.getPokemons());
        }
        else {
            return helper_1.default.sendResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'Erro no consumo da api');
        }
    }
    getById(id, req, res) {
        pokemonsService_1.default.getPokemonbyId(id, req, res);
    }
    resById(req, res) {
        if (pokemonsService_1.default.getPokemon().nome) {
            return helper_1.default.sendResponse(res, HttpStatus.OK, pokemonsService_1.default.getPokemon());
        }
        else {
            return helper_1.default.sendResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'Erro no consumo da api');
        }
    }
}
exports.default = new PokemonsController();
