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
      return Helper.sendResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'Erro no consumo da api')
    }    
  }
 
  getById(id,req,res) {
    PokemonsService.getPokemonbyId(id,req,res);    
  }  

  resById(req, res) { 
    if(PokemonsService.getPokemon().nome) {
      return Helper.sendResponse(res, HttpStatus.OK, PokemonsService.getPokemon())
    }else {
      return Helper.sendResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'Erro no consumo da api')
    }
  }
  
}

export default new PokemonsController();
