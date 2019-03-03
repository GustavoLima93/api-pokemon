"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PokemonDetails {
    constructor(nome = '', status = [], tipo = [], sprites = []) {
        this.nome = nome;
        this.status = status;
        this.tipo = tipo;
        this.sprites = sprites;
    }
}
exports.PokemonDetails = PokemonDetails;
