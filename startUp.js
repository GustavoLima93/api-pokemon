"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pokemonsController_1 = require("./controller/pokemonsController");
class StartUp {
    constructor() {
        this.app = express();
        this.startConsumo();
        this.middler();
        this.routes();
    }
    startConsumo() {
        return pokemonsController_1.default.startRest();
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
            res.status(200).send({ versão: "0.0.1" });
        });
        this.app.route("/api/v1/pokemons").get((req, res) => {
            pokemonsController_1.default.get(req, res);
        });
        this.app.route("/api/v1/pokemons/:id").get((req, res) => {
            pokemonsController_1.default.getById(req, res);
        });
    }
}
exports.default = new StartUp();
