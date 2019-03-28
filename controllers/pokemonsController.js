"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status");
const pokemonsService_1 = require("../services/pokemonsService");
const helper_1 = require("../infra/helper");
class PokemonsController {
    getAll(req, res) {
        pokemonsService_1.default.getAll()
            .then((pokemons) => {
            return helper_1.default.sendResponse(res, HttpStatus.OK, pokemons);
        })
            .catch(err => {
            return helper_1.default.sendResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, "Ocorreu um erro.");
        });
    }
    getById(req, res) {
        const param = req.params.id;
        if (Number(param)) {
            pokemonsService_1.default.getById(param).then((pokemons) => {
                return helper_1.default.sendResponse(res, HttpStatus.OK, pokemons);
            })
                .catch(err => {
                return helper_1.default.sendResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, "Ocorreu um erro.");
            });
        }
        else {
            return helper_1.default.sendResponse(res, HttpStatus.NOT_FOUND, "Erro 404");
        }
    }
    getByName(req, res) {
        const param = req.params.id;
        if (param.split('').length < 30) {
            pokemonsService_1.default.getByName(param).then((pokemons) => {
                return helper_1.default.sendResponse(res, HttpStatus.OK, pokemons);
            })
                .catch(err => {
                return helper_1.default.sendResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, "Ocorreu um erro.");
            });
        }
        else {
            return helper_1.default.sendResponse(res, HttpStatus.NOT_FOUND, "Erro 404");
        }
    }
    getByGeneration(req, res) {
        const param = req.params.id;
        if (Number(param) >= 1 && Number(param) <= 7) {
            pokemonsService_1.default.getByGeneration(param).then((pokemons) => {
                return helper_1.default.sendResponse(res, HttpStatus.OK, pokemons);
            })
                .catch(err => {
                return helper_1.default.sendResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, "Ocorreu um erro.");
            });
        }
        else {
            return helper_1.default.sendResponse(res, HttpStatus.NOT_FOUND, "Erro 404");
        }
    }
}
exports.default = new PokemonsController();
