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
            <h1>Login</h1>
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
                    axios.post('/api/users/authenticate', userData)
                        .then(response => {
                            navigate("/jobSearch")
                            console.log(response)
                        })
                        .catch(error => console.log(error));
                }}
            >Login</button>

        </div>
    );
// error提示
} 