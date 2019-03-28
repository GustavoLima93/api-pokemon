"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebasedb_1 = require("../infra/firebasedb");
class PokemonsService {
    getAll() {
        return new Promise((resolve, reject) => {
            if (this.pokemons) {
                return resolve(this.pokemons);
            }
            firebasedb_1.default.db().ref("pokemons/")
                .on("value", snapshot => {
                this.pokemons = snapshot.val();
                return resolve(snapshot.val());
            }, (errorObject) => {
                console.log("The read failed: " + errorObject.code);
                return reject(errorObject.code);
            });
        });
    }
    getById(param) {
        return new Promise((resolve, reject) => {
            firebasedb_1.default.db().ref("pokemons/").orderByKey().equalTo(param).on("child_added", (snapshot) => {
                return resolve(snapshot.val());
            }, (errorObject) => {
                console.log("The read failed: " + errorObject.code);
                return reject(errorObject.code);
            });
        });
    }
    getByName(param) {
        let name;
        return new Promise((resolve, reject) => {
            if (this.pokemons) {
                name = this.pokemons.filter((element) => {
                    return element.nome.includes(param);
                });
                return resolve(name);
            }
            firebasedb_1.default.db().ref("pokemons/")
                .on("value", snapshot => {
                name = snapshot.val().filter((element) => {
                    return element.nome.includes(param);
                });
                this.pokemons = snapshot.val();
                return resolve(name);
            }, (errorObject) => {
                console.log("The read failed: " + errorObject.code);
                return reject(errorObject.code);
            });
        });
    }
    getByGeneration(param) {
        const generation = [];
        switch (param) {
            case '1':
                return new Promise((resolve, reject) => {
                    firebasedb_1.default.db().ref("pokemons/").orderByKey().startAt("1").endAt("151").on("child_added", (snapshot) => {
                        generation.push(snapshot.val());
                        return resolve(generation);
                    }, (errorObject) => {
                        console.log("The read failed: " + errorObject.code);
                        return reject(errorObject.code);
                    });
                });
            case '2':
                return new Promise((resolve, reject) => {
                    firebasedb_1.default.db().ref("pokemons/").orderByKey().startAt("152").endAt("251").on("child_added", (snapshot) => {
                        generation.push(snapshot.val());
                        return resolve(generation);
                    }, (errorObject) => {
                        console.log("The read failed: " + errorObject.code);
                        return reject(errorObject.code);
                    });
                });
            case '3':
                return new Promise((resolve, reject) => {
                    firebasedb_1.default.db().ref("pokemons/").orderByKey().startAt("252").endAt("386").on("child_added", (snapshot) => {
                        generation.push(snapshot.val());
                        return resolve(generation);
                    }, (errorObject) => {
                        console.log("The read failed: " + errorObject.code);
                        return reject(errorObject.code);
                    });
                });
            case '4':
                return new Promise((resolve, reject) => {
                    firebasedb_1.default.db().ref("pokemons/").orderByKey().startAt("387").endAt("493").on("child_added", (snapshot) => {
                        generation.push(snapshot.val());
                        return resolve(generation);
                    }, (errorObject) => {
                        console.log("The read failed: " + errorObject.code);
                        return reject(errorObject.code);
                    });
                });
            case '5':
                return new Promise((resolve, reject) => {
                    firebasedb_1.default.db().ref("pokemons/").orderByKey().startAt("494").endAt("649").on("child_added", (snapshot) => {
                        generation.push(snapshot.val());
                        return resolve(generation);
                    }, (errorObject) => {
                        console.log("The read failed: " + errorObject.code);
                        return reject(errorObject.code);
                    });
                });
            case '6':
                return new Promise((resolve, reject) => {
                    firebasedb_1.default.db().ref("pokemons/").orderByKey().startAt("650").endAt("721").on("child_added", (snapshot) => {
                        generation.push(snapshot.val());
                        return resolve(generation);
                    }, (errorObject) => {
                        console.log("The read failed: " + errorObject.code);
                        return reject(errorObject.code);
                    });
                });
            case '7':
                return new Promise((resolve, reject) => {
                    firebasedb_1.default.db().ref("pokemons/").orderByKey().startAt("722").endAt("807").on("child_added", (snapshot) => {
                        generation.push(snapshot.val());
                        return resolve(generation);
                    }, (errorObject) => {
                        console.log("The read failed: " + errorObject.code);
                        return reject(errorObject.code);
                    });
                });
        }
    }
}
exports.default = new PokemonsService();
