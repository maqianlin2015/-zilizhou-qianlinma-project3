import { useEffect, useState } from 'react';
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router';

function App() {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState('');
  const [job, setJob] = useState({
    title: 'No job selected',
  })
  const [currentUserName, setCurrentUserName] = useState('');
  const [errorMsg, setError] = useState(null);

  // useEffect(onSearchButtonClick, []);

  function onSearchButtonClick() {
    if (!formInput) {
      setError("You must type in a Job name.");
      return;
    } else {
      navigate("/jobSearch/" + formInput);
    }
  }

  function checkLogin() {
    axios.get('/api/users/whoIsLoggedIn')
      .then((response) => {
        console.log("Success");
        // console.log(response);
        setCurrentUserName(response.data);
      })
      .catch(() => navigate('/login'))
  }

  useEffect(checkLogin, []);

  function onFavoriteListClick() {
    if (!currentUserName) { // 其实这行没机会跑到
      setError("You have to login first");
      return;
    } else {
      navigate("/myFavorite/" + currentUserName);
    }
  }
  // console.log("helper0");
  // const helper = function helper0() {
  //   console.log('current user: ' + currentUserName);
  //   if (currentUserName) {
  //     console.log("helper?");
  //     return (<button onClick={onFavoriteListClick}>
  //       My Favorite
  //     </button>);
  //   }
  // }


  const helperComponent = (currentUserName) ?
    (<>
      <div>
        <button onClick={onFavoriteListClick}>
          My Favorite
        </button>;
      </div>
    </>) :
    (<div></div>);


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
      <div>
        {helperComponent}
      </div>
    </div>
  );
}


export default App;
