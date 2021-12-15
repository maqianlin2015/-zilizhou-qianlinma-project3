import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PokemonSearchBar from './PokemonList';


export default function() {
// useParams()：在index.js中, 有Route path=.../:pokemonName,所以用来取这个pokemonName
    const pokemonName = useParams().pokemonName;

    function findPokemonDetails() {
        axios.get('api/pokemon/find/' + pokemonName)
            .then(response => setPokemon(response.data))
            .then(error => console.log("Could not find Pokemon"));
    }

console.log("pkm is:" + pokemon);
    const [pokemon, setPokemon] = useState(null);
    useEffect(findPokemonDetails, []);

    const pokemonComponent = pokemon ? 
        (<><div>
            Pokemon Name: {pokemon.name}
        </div>
        <div>
            Pokemon Health: {pokemon.health} 
        </div></>) :
        (<div> No Pokemon found </div>);

    return (
        <div>
            {pokemonComponent}
        </div>
    )
}