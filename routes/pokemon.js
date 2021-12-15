const express = require('express');
const auth_middleware = require('./auth_middleware');
// 这么做是因为在server.js中已经有了app.use把一个固定前缀的request引过来，在这里你就用rounte接着引导：
// 比如下面router.get('/findAll', function(request, response)
// 补全了其实是 api/pokemon/findAll
const router = express.Router();
// used to connect my code pkm.js to model (model can help to connect to DB)
const PokemonAccessor = require('./models/Pokemon.Model');


// Returns all known pokemon
router.get('/findAll', function(request, response) {
  return PokemonAccessor.getAllPokemon()
    .then(pokemonResponse => response.status(200).send(pokemonResponse))
    .catch(error => response.status(400).send(error))
    // pokemonResponse有点像是DB返回的，但是response是最终http返回的，要把pokemonResponse包含到resonse返回 
})

// 我只是得到属于我自己这个owner的pkm
router.get('/myPokemon', auth_middleware, function(request, response) {
  return PokemonAccessor.findPokemonByOwner(request.username)
  .then(pokemonResponse => response.status(200).send(pokemonResponse))
  .catch(error => response.status(400).send(error))
  
})


// 下面注释 -> Query Params:
// 当你postman给了一个url： api/pokemon/find?pokemonName=pilachu 
// req.params 的 .params是对request的默认用法，就是找？后面的。 至于“.pokemonName”是看？后面的key的名字一样

// router.get('/find', function(req, res) {
//   const pokemonQuery = req.params.pokemonName;
//   // const foundPokemon = pokemons.find((pokemon) => pokemon.name === pokemonQuery)
//   let foundPokemon = null;
    // YC： in loop - index/ of loop 
//   for (let pokemon of pokemons) {
//     if (pokemon.name === pokemonQuery) {
//       console.log(pokemon)
//       foundPokemon = pokemon
//     }
//   } 
//   if (!foundPokemon) {
//     return res.status(404).send("No pokemon found!");
//   }

//   res.send(foundPokemon);
  
// });
////////////////////////////////////////////////////////////////////
// 下面注释 -> Path Params:
// 当你postman给了一个url： api/pokemon/find/pilachu 
// req.params 的 .params是对request的默认用法，就是找？后面的。 至于“.pokemonName”是看？后面的key的名字一样
      //'/find/:pokemonName'不是 ‘/find’了 
// router.get('/find/:pokemonName', function(req, res) {
//   const pokemonQuery = req.params.pokemonName;
//   let foundPokemon = null;
//     // YC： in loop - index/ of loop 
//   for (let pokemon of pokemons) {
//     if (pokemon.name === pokemonQuery) {
//       console.log(pokemon)
//       foundPokemon = pokemon
//     }
//   } 
//   if (!foundPokemon) {
//     return res.status(404).send("No pokemon found!");
//   }

//   res.send(foundPokemon);
  
// });

// 下面这个只是我该写的：
router.get('/find/:pokemonName', function(req, res) {
  const pokemonQuery = req.params.pokemonName;
  return PokemonModel.findPokemonByName(pokemonQuery)
  .then((pokemonResponse) => {
      if(!pokemonResponse) {
          res.status(404).send("Pkm not found");
      }  
      res.send(pokemonResponse)
  })
  .catch((error) => response.status(500).send("Issue getting Pkm"))  
});




router.post('/create', auth_middleware, (request, response) => {
  // .body
  const pokemon = request.body;
  // 下面几行只是提醒一种语法哈
  // const {name, health} = body;
  // pokemon.push({
  //   name: this.name,
  //   health:health,
  // })
  if(!pokemon.name || !pokemon.health || !pokemon.type) {
    return response.status(422).send("Missing data");
  }

  pokemon.owner = request.username;
 // tip：为何pokemonResponse呢，因为 
  PokemonAccessor.insertPokemon(request.body)
    .then(pokemonResponse => response.status(200).send(pokemonResponse))
    .catch(error => response.status(400).send(error))

  // return PokemonAccessor.findPokemonByName(name)
  //   .then((pokemonResponse) => {
  //     if(pokemonResponse.length) {
  //       response.status(402).send("Pokemon with that name already exists")
  //     } else {
        
    //   }

    // }


})


// Export Modules：
// 在一个file/module中，用到export时，export作用：
// any data that you want to be accessible outside of this code
// 比如，这里
// exports是一个obj，他有他的func和attri，他们是可以take outside this file
// 具体怎么实现，见我的笔记Express.js那一页下面
module.exports = router; // <== Look at our new friend, module.exports!