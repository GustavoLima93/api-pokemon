import * as express from "express";
import * as bodyParser from "body-parser";

import PokemonsController from "./controller/pokemonsController";

class StartUp {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.startConsumo();
    this.middler();
    this.routes();
  }

  startConsumo() {
    return PokemonsController.startRest();
  }

  middler() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  routes() {

    this.app.route("/").get((req, res) => {
      res.status(200).send({ versão: "0.0.1" });
    });

    this.app.route("/api/v1/pokemons").get((req, res) => {
      PokemonsController.get(req, res);
    });

    this.app.route("/api/v1/pokemons/:id").get((req, res) => {
      let id = req.params.id     
       Number(id) ? PokemonsController.getById(id,req,res) :  res.status(404).send({ error: "Não foi possivel efetuar sua consulta." });           
    });
  }
}

export default new StartUp();
