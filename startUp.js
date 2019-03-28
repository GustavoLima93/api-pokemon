"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const firebasedb_1 = require("./infra/firebasedb");
const pokemonsController_1 = require("./controllers/pokemonsController");
class StartUp {
    constructor() {
        firebasedb_1.default.connectionDb;
        this.app = express();
        this.middler();
        this.routes();
    }
    enableCors() {
        const options = {
            methods: "GET,OPTIONS,PUT,POST,DELETE",
            origin: "*"
        };
        this.app.use(cors(options));
    }
    middler() {
        this.enableCors();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    routes() {
        this.app.route("/").get((req, res) => {
            res.send({ versao: "GHLIMA-API-POkEMON-V2" });
        });
        this.app.route("/api/v2/pokemons").get(pokemonsController_1.default.getAll);
        this.app.route("/api/v2/pokemon/:id").get(pokemonsController_1.default.getById);
        this.app.route("/api/v2/pokemon/name/:id").get(pokemonsController_1.default.getByName);
        this.app.route("/api/v2/pokemons/generation/:id").get(pokemonsController_1.default.getByGeneration);
    }
}
exports.default = new StartUp();
