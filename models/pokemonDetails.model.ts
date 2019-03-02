export class PokemonDetails {
    constructor(
        public nome: string = '',
        public statusBase: number[] = [],
        public statusName: string[] = [],
        public tipo: string[] = [],
        public sprites: string[] = []
    ) {}
}