import { useState } from 'react';
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router';

function App() {

  const navigate = useNavigate();
  const [formInput, setFormInput] = useState('');
  const [pokemon, setPokemon] = useState({
    name: 'No pokemon selected', health: -1,
  })
  const [errorMsg, setError] = useState(null);

  // useEffect(onSearchButtonClick, []);


  function onSearchButtonClick() {    
    if (!formInput) {
      setError("You must type in a Pokemon name.");
      return;
    }
    axios.get('/api/pokemon/find/findPkmByName/' + formInput)
      .then(response => {setPokemon(response.data)
        navigate("/alljobs")
      })
      .catch(error => console.log("Could not find Pkm"));
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
