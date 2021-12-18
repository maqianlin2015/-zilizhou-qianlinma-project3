import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { ReactComponent as Home } from "./logos/home.svg";
import { ReactComponent as JobSearchLogo } from "./logos/search-logo.svg";
import { ReactComponent as Favoriate } from "./logos/favoriate.svg";
import "./style/NavBar.css";
import "./style/HomeSearchPage.css";
import { Link } from "react-router-dom";
import UserNavBar from "./UserNavBar";
import NavBar from "./NavBar";

function App() {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState("");
  const [job, setJob] = useState({
    title: "No job selected",
  });
  const [currentUserName, setCurrentUserName] = useState("");
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

  // function checkLogout() {
  //   axios
  //     .get("/api/users/logout")
  //     .then((response) => {
  //       console.log("Logout!");
  //       // console.log(response);
  //       setCurrentUserName(null);
  //     })
  //     .catch(() => navigate("/"));
  // }

  // useEffect(checkLogout, []);

  function onFavoriteListClick() {
    if (!currentUserName) {
      // 其实这行没机会跑到
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

  // const helper = (currentUserName) ? (return( <UserNavBar/>) : (<NavBar/);

  const helperComponent = currentUserName ? (
    <>
      <div>
        <button onFavoriteListClick>
          <b>My Favorite</b>
        </button>
        {/*zili： 删掉了一个分号*/}
      </div>
    </>
  ) : (
    <div></div>
  );
  // console.log("curUserName" + currentUserName);
  // const tmp = currentUserName ? <UserNavBar /> : <NavBar />;

  return (
    <div>
      {/* 写navbar */}
      {/* {tmp} */}
      <UserNavBar />
      <section id="search_box">
        {errorMsg}
        <input
          type="text"
          value={formInput}
          className="search"
          placeholder="Job title"
          onChange={(e) => {
            setError(null);
            setFormInput(e.target.value);
          }}
        />
      </section>
      <button id="btn" onClick={onSearchButtonClick}>
        Search for Job
      </button>
      {/* qianlin's part {errorMsg}
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
      </div> */}
    </div>
  );
}

export default App;
