import { useState } from 'react';
import axios, { Axios } from 'axios';

function App() {
  const [formInput, setFormInput] = useState('');
  const [pokemon, setPokemon] = useState({
    name: 'No pokemon selected', health: -1,
  })
  const [errorMsg, setError] = useState(null);
  // 当我click，value in the input filed会被searched on the back end,
  // 获得信息后，改变前端
  function onSearchButtonClick() {
    // const pokemon = axios.get('...')
    // console.log(pokemon);
    
    if (!formInput) {
      setError("You must type in a Pokemon name.");
      return;
    }
    // forminput是看输入的是啥小精灵 
    axios.get('/api/pokemon/find/' + formInput)
      .then(response => setPokemon(response.data))
      .catch(error => setPokemon({
        name: "No pokemon found",
        health: null, 
      }));
    console.log("hello, there");

    // doSomething();
  }

  return (
    <div>
      {errorMsg}
      <input type='text' value={formInput}
      onChange={(e) => {
        setError(null);
        setFormInput(e.target.value)
      
      }} />
      <button onClick={onSearchButtonClick}>
        Search for Pokemon
      </button>
      <div>
        Pokemon Name: {pokemon.name}
      </div>
      <div>
        Pokemon Health: {pokemon.health}
      </div>

    </div>
 
  );
}

export default App;
