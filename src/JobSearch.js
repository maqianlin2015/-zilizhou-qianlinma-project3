import { useState } from 'react';
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router';

function App() {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState('');
  const [job, setJob] = useState({
    title: 'No job selected',
  })
  const [errorMsg, setError] = useState(null);

  // useEffect(onSearchButtonClick, []);

  function onSearchButtonClick() {    
    if (!formInput) {
      setError("You must type in a Job name.");
      return;
    } else {
        navigate("/jobSearch/" + formInput);
        // 上面这里其实不s是all job， 应该是一个特殊制定的path，用到了form input的输入 
        // alljob只是一个引子，开始做jobsearchresult
    }
    // localhost:3000/jobSearch/api/jobs/find/findByTitle/seller
    // axios.get('/api/pokemon/find/findPkmByName/' + formInput)
    //   .then(response => {setPokemon(response.data)
    //     navigate("/alljobs")
    //   })
    //   .catch(error => console.log("Could not find Pkm"));

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
        Search for Job
      </button>

    </div>
 
  );
}

export default App;
