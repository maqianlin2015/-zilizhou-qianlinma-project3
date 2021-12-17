import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import NavBar from './NavBar';
import "./style/LoginRegister.css";


export default (props) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        password: '',
        username: '',
    })

    const [loggedInName, setLoggedInName] = useState('');

    return (
        <div>
            <NavBar />
            <section className="form">
            {/* <h1>Register</h1> */}
            <h5>Username:</h5>
            <input className="input" value={userData.username} onChange={(e) => {
                const username = e.target.value;
                setUserData({
                    ...userData,
                    username: username
                })
            }}/>
            <h5>Password:</h5>
            <input className="input"value={userData.password} onChange={(e) => {
                const password = e.target.value;
                setUserData({
                    ...userData,
                    password: password
                })
            }} type='password' />
            <button id="log-register-btn"
                onClick={() => {
                    axios.post('/api/users/', userData)
                        .then(response => {
                            // navigate("/jobSearch")
                            console.log(response)
                        })
                        .catch(error => console.log(error));
                }}
            ><b>Register</b></button>
            </section>

        </div>
    );
// 如果没注册过，就注册了并跳转主页，如果注册过了,error提示
} 