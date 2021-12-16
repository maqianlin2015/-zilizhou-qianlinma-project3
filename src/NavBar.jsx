import React from 'react';
import {NavLink} from 'react-router-dom'
import {ReactComponent as Home} from './logos/home.svg';
import {ReactComponent as JobSearchLogo} from './logos/search-logo.svg';
import {useNavigate} from "react-router-dom";
import "./style/NavBar.css";
import { Link } from 'react-router-dom';


export default function NavBar(){
    let navigate = useNavigate();

    function handleClick(){
        navigate("/login");
    }

    return(
        <nav>
            <div className='div-header'>
                <div className='div-svg-search'>
                    <JobSearchLogo/>
                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <NavLink exact to='/Home' ><Home className='div-svg'/></NavLink>
                    <Link to={"/login"}>
                        <button className='button-header' ><b>Log in</b></button></Link>
                    <div className="divider"/>
                    <Link to={"/register"}>
                        <button className='button-header' ><b>Register</b></button></Link>
                </div>
            </div>
        </nav>
    )
}