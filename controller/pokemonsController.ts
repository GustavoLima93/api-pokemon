import * as HttpStatus from 'http-status';

import PokemonsService from '../services/pokemonsService';
import Helper from '../infra/helper';

class PokemonsController {  

  startRest() {
    PokemonsService.getAllRest()
  }

  get(req, res) {
    if(PokemonsService.getPokemons().length) {      
      return Helper.sendResponse(res, HttpStatus.OK, PokemonsService.getPokemons())
    }else {
      return console.error.bind(console, 'Erro no consumo da api')
    }    
  }
 
  getById(id,req,res) {
    PokemonsService.getPokemonbyId(id,req,res);    
  }  
  
}

export default new PokemonsController();
