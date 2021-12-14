import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router';


export default (props) => {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        password: '',
        username: '',
    })

    const [loggedInName, setLoggedInName] = useState('');

    return (
        <div>
            <h3>Input Name and Password</h3>
            <h5>Username:</h5>
            <input value={userData.username} onChange={(e) => {
                const username = e.target.value;
                setUserData({
                    ...userData,
                    username: username
                })
            }}/>
            <h5>Password:</h5>
            <input value={userData.password} onChange={(e) => {
                const password = e.target.value;
                setUserData({
                    ...userData,
                    password: password
                })
            }} type='password' />
            <button
                onClick={() => {
                    axios.post('/api/users', userData)
                        .then(response => {
                            navigate("/myPokemon")
                            console.log(response)
                        })
                        .catch(error => console.log(error));
                }}
            >Register New User</button>
            <button
                onClick={
                    () => {
                        axios.get('/api/users/whoIsLoggedIn')
                            .then(response => setLoggedInName(response.data))
                            .catch(error => console.log(error));
                    }
                }
                >Who is logged in?</button>
            {loggedInName && <div>{loggedInName}</div>}
        </div>
    );


} 