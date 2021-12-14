// 下面这些都是准备工作啦
// import mongoose，以及用到的Schema，用mongoose.model建立model，这样的话就可以用instance调用写好的function 
const mongoose = require("mongoose")
const PokemonSchema = require('../schema/Pokemon.Schema').PokemonSchema

const PokemonModel = mongoose.model("Pokemon", PokemonSchema);
// 下面的func帮我向mongodb query

// input是一个obj
function insertPokemon(pokemon) {
    return PokemonModel.create(pokemon);
}

function getAllPokemon() {
    return PokemonModel.find().exec();
}

function findPokemonByName(name) {
    return PokemonModel.find({name: name}).exec();
}

function findPokemonByOwner(owner) {
    return PokemonModel.find({
        owner: owner
    }).exec();
}

// findById 有这个特殊的
function findPokemonById(id) {
    return PokemonModel.findById(id).exec();
}

// Make sure to export a function after you create it!
// 别忘了export funcs
module.exports = {
    findPokemonByOwner,
    insertPokemon,
    findPokemonByName,
    getAllPokemon,
    findPokemonById
};