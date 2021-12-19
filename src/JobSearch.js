import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router";
import "./style/NavBar.css";
import "./style/HomeSearchPage.css";

function App() {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState("");
  const [job, setJob] = useState({
    title: "No job selected",
  });
  const [currentUserName, setCurrentUserName] = useState("");
  const [errorMsg, setError] = useState(null);

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
        setCurrentUserName(response.data);
      })
      .catch(() => navigate("/login"));
  }

  useEffect(checkLogin, []);

  const helperComponent = currentUserName ? (
    <>
      <div>
        <button onFavoriteListClick>
          <b>My Favorite</b>
        </button>
      </div>
    </>
  ) : (
    <div></div>
  );

  return (
    <div>
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
    </div>
  );
}

export default App;
