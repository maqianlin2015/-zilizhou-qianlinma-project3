//mongoose提供的class -> Schema 
  
const Schema = require('mongoose').Schema;

exports.PokemonSchema = new Schema({
    name: String,
    health: {type: Number},
    type: String,
    owner: String,
// this explicitly declares what collection we're using
}, { collection : 'pokemons' });
// 最后一行，意思是，also create a collection called pokemons 


// 有种写法
// health : {
//     type: Number/Date/String
//     default: 1 .  不给值，就默认
// }

// name: {
//     type: String,
//     unique: true;
// }