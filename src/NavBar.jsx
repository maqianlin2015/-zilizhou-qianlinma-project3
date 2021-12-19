import React from 'react';
import { useContext, useState } from 'react';
import UserContext from './UserContext';
import {NavLink} from 'react-router-dom'
import {ReactComponent as Home} from './logos/home.svg';
import {ReactComponent as JobSearchLogo} from './logos/search-logo.svg';
import {useNavigate} from "react-router-dom";
import "./style/NavBar.css";
import { ReactComponent as Favoriate } from "./logos/favoriate.svg";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import axios from "axios";

export default function NavBar(){
    let navigate = useNavigate();
    const userContext = useContext(UserContext);
    const { user } = userContext;

    const { logout } = userContext;

    function logoutOnclick() {
    return axios.post('/api/users/logout')
    .then(() => {
      logout();
      navigate('/')
    })
    .catch(console.error)
  ;}
    
    return(
        <nav>
            <div className='div-header'>
                <div className='div-svg-search'>
                    <JobSearchLogo/>
                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <NavLink exact to='/' ><Home className='div-svg'/></NavLink>
                    {user && <Link to={"/myFavorite/" + user}>
                        <Favoriate className="div-svg" />
                    </Link>}
                    <Dropdown>
                        <Dropdown.Toggle split variant="success" id="dropdown-basic">
                        {user} 
                        </Dropdown.Toggle >
                    </Dropdown>
                    {user && 
                        <Link to={"/addJob"}>
                            <button className="button-header">
                                <b>Add Job</b>
                            </button>
                        </Link>
                    }
                    {!user && <Link to={"/login"}>
                        <button className='button-header' ><b>Log in</b></button></Link>}
                    <div className="divider"/>
                    {!user&& <Link to={"/register"}>
                        <button className='button-header' ><b>Register</b></button></Link>}
                  
                       {user && <button className="button-header"  onClick={logoutOnclick}>
                            <b>Log Out</b>
                        </button>}
                   
                </div>
            </div>
        </nav>
    )
}