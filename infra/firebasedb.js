"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase = require("firebase");
const environment_1 = require("./../environments/environment");
class FirebaseDb {
    constructor() {
        this.connectionDb = firebase.initializeApp(environment_1.environment.firebase);
        this.db = firebase.database;
    }
}
exports.default = new FirebaseDb();
