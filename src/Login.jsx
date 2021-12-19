import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import "./style/LoginRegister.css";
import UserContext from "./UserContext";

export default (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    password: "",
    username: "",
  });

  const [errorMsg, setError] = useState(null);

  const { login } = useContext(UserContext);

  function onLogInonClick() {
    if (!(userData.password && userData.username)) {
      setError("You must fill all field!");
      return;
    }

    axios
      .post("/api/users/authenticate", userData)
      .then((response) => {
        console.log(response);
        if (response?.data?.name) {
          login(response.data.name);
          navigate("/jobSearch");
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <section className="form">
        <h5>Username:</h5>
        <input
          className="input"
          value={userData.username}
          onChange={(e) => {
            setError(null);
            const username = e.target.value;
            setUserData({
              ...userData,
              username: username,
            });
          }}
        />
        <h5>Password:</h5>
        <input
          className="input"
          value={userData.password}
          onChange={(e) => {
            setError(null);
            const password = e.target.value;
            setUserData({
              ...userData,
              password: password,
            });
          }}
          type="password"
        />
        <button id="log-register-btn" onClick={onLogInonClick}>
          <b>Login</b>
        </button>
        <p id="msg">
          <b>{errorMsg}</b>
        </p>
      </section>
    </div>
  );
  // error提示
};
