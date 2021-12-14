import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function PokemonSearchBar() {
    const [allPokemon, setAllPokemon] = useState([]);

    // response.data 用法
    function findAllPokemon() {
        axios.get('api/pokemon/findAll')
            .then(response => {
                setAllPokemon(response.data)
            })
            .catch(error => console.error(error));
    }
    // 任何page
    useEffect(findAllPokemon, []);
    // 下面，当你click，进入
    const pokemonListComponent = allPokemon.map(pokemon => {
        return (<>
        <p></p>
        <Link to={"pokemon/" + pokemon.name}>{pokemon.name}</Link>
        </>)
    })

    return (
        <div>
            <h1>These are all my Pokemon</h1>
            {pokemonListComponent}
        </div>
    )
}