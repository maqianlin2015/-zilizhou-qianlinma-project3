import React, { useState, useEffect } from "react";
import "./style/NavBar.css";
import { ReactComponent as Home } from "./logos/home.svg";
import { ReactComponent as JobSearchLogo } from "./logos/search-logo.svg";
import { ReactComponent as Favoriate } from "./logos/favoriate.svg";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import { Dropdown } from "react-bootstrap";

export default function UserNaBar() {
  const navigate = useNavigate();

  const [currentUserName, setCurrentUserName] = useState("");

  function checkLogin() {
    axios
      .get("/api/users/whoIsLoggedIn")
      .then((response) => {
        console.log("Success");
        // console.log(response);
        setCurrentUserName(response.data);
      })
      .catch(() => navigate("/login"));
  }

  useEffect(checkLogin, []);

  return (
    <div>
      <nav>
        <div className="div-header">
          <div className="div-svg-search">
            <JobSearchLogo />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <NavLink exact to="/jobSearch">
              <Home className="div-svg" />
            </NavLink>
            <Link to={"/myFavorite/" + currentUserName}>
              <Favoriate className="div-svg" />
            </Link>
            <Dropdown>
              <Dropdown.Toggle split variant="success" id="dropdown-basic">
              {currentUserName} 
              </Dropdown.Toggle >
            </Dropdown>
            <Link to={"/addJob"}>
              <button className="button-header">
                <b>Add Job</b>
              </button>
            </Link>
            <div className="divider" />
            <Link to={"/"}>
              <button className="button-header">
                <b>Log Out</b>
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
