import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import NavBar from "./NavBar";
import "./style/LoginRegister.css";

export default (props) => {
  const navigate = useNavigate();
  const [errorMsg, setError] = useState(null);
  const [userData, setUserData] = useState({
    password: "",
    // passwordVerification:'',
    username: "",
  });
  const [passwordVerification, setPasswordVerification] = useState("");

  const [loggedInName, setLoggedInName] = useState("");
  // const [errorMsg, setError] = useState(null);

  //验证密码匹配function
  // function onRegisterClick(){
  //     if (userData.password !== userData.passwordVerification){
  //         setError ("The password does not match.");
  //         return;}
  //     else {axios.post('/api/users/', userData)
  //     .then(response => {
  //         // navigate("/jobSearch")
  //         console.log(response)
  //     })
  //     .catch(error => console.log(error));
  //     return("success")
  //     }
  //     }

  const verf = passwordVerification == userData.password ? true : false;

  function onRegisteronClick() {
    if (
      !(
        userData.password && userData.username && passwordVerification
      )
    ) {
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
                  //   navigate("/jobSearch")
                  navigate("/jobSearch");
                  //   console.log(userData);
                  //   console.log(response);
                })
                .catch((error) => console.log(error));
  }

  //   useEffect(verf, [passwordVerification]);

  return (
    <div>
      <NavBar />
      <section className="form">
        {/* {errorMsg} */}
        {/* <h1>Register</h1> */}
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
        <button
          id="log-register-btn"
          onClick={onRegisteronClick}

          // onClick={() => {
          //   if (verf) {
          //     axios
          //       .post("/api/users/", userData)
          //       .then((response) => {
          //         //   navigate("/jobSearch")
          //         navigate("/jobSearch");
          //         //   console.log(userData);
          //         //   console.log(response);
          //       })
          //       .catch((error) => console.log(error));
          //   } else {
          //     console.log("Password did not match the previous one!");
          //   }
          // }}
        >
          <b>Register</b>
        </button>
        <p id="msg"><b>{errorMsg}</b></p>
      </section>
    </div>
  );
  // 如果没注册过，就注册了并跳转主页，如果注册过了,error提示
};
