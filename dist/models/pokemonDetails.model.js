"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PokemonDetails {
    constructor(nome = '', statusBase = [], statusName = [], tipo = [], sprites = []) {
        this.nome = nome;
        this.statusBase = statusBase;
        this.statusName = statusName;
        this.tipo = tipo;
        this.sprites = sprites;
    }
}
exports.PokemonDetails = PokemonDetails;
