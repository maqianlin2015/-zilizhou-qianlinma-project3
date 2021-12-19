import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./style/LoginRegister.css";

export default (props) => {
  const navigate = useNavigate();
  const [errorMsg, setError] = useState(null);
  const [userData, setUserData] = useState({
    password: "",

    username: "",
  });
  const [passwordVerification, setPasswordVerification] = useState("");

  const verf = passwordVerification == userData.password ? true : false;

  function onRegisteronClick() {
    if (!(userData.password && userData.username && passwordVerification)) {
      setError("You must fill all field!");
      return;
    }
    if (!verf) {
      setError("Your password does not match the previous one!");
      return;
    }
    axios
      .post("/api/users/", userData)
      .then((response) => {
        navigate("/jobSearch");
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
        <h5>Password Verification:</h5>
        <input
          className="input"
          type="password"
          value={passwordVerification}
          onChange={(e) => {
            setError(null);
            const passwordVerification = e.target.value;
            setPasswordVerification(passwordVerification);
          }}
        />
        <button id="log-register-btn" onClick={onRegisteronClick}>
          <b>Register</b>
        </button>
        <p id="msg">
          <b>{errorMsg}</b>
        </p>
      </section>
    </div>
  );
};
