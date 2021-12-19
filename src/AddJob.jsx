import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./style/LoginRegister.css";
const { v4: uuid } = require("uuid");


export default function AddJob(props) {
  const navigate = useNavigate();
  const [errorMsg, setError] = useState(null);
  const [jobForm, setJobForm] = useState({
    id: uuid(),
    title: "",
    location: "",
    companyName: "",
    description: "",
    employerEmail: "",
    companyLink: "",
    postdate: new Date().toISOString().split("T")[0],
  });

  const [myJob, setMyJob] = useState([]);
  function createForm() {
    if (!jobForm) {
      setError("Please fill out the form.");
      return;
    }
  }

  function getMyJob() {
    axios
      .get("/api/jobs/findAll")
      .then((response) => setMyJob(response.data))
      .catch((error) => console.log(error));
  }

  function checkLogin() {
    axios
      .get("/api/users/whoIsLoggedIn")
      .then(() => console.log("Success"))
      .catch(() => navigate("/"));
  }

  useEffect(checkLogin, []);

  useEffect(getMyJob, []);

  const jobElement = [];
  for (let job of myJob) {
    jobElement.push(
      <div>
        {job.title} - {job.location} - {job.companyName}
      </div>
    );
  }

  function onSubmitAddJobButtonClick() {
    if (
      !(
        jobForm.title &&
        jobForm.location &&
        jobForm.companyName &&
        jobForm.description &&
        jobForm.employerEmail
      )
    ) {
      setError("You mustfill all the required field!");
      return;
    }

    axios
      .post("/api/jobs/create", jobForm)
      .then((response) => {
        getMyJob();
        navigate("/job/" + jobForm.id);
        console.log(response);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
     
      <section className="job-container">
        <h5>Title:</h5>
        <input
          value={jobForm.title}
          onChange={(e) => {
            setError(null);
            setJobForm({
              ...jobForm,
              title: e.target.value,
            });
          }}
        ></input>
        <h5>Location:</h5>
        <input
          value={jobForm.location}
          onChange={(e) => {
            setError(null);
            setJobForm({
              ...jobForm,
              location: e.target.value,
            });
          }}
        ></input>
        <h5>Company Name:</h5>
        <input
          value={jobForm.companyName}
          onChange={(e) => {
            setError(null);
            setJobForm({
              ...jobForm,
              companyName: e.target.value,
            });
          }}
        ></input>

        <h5>Description:</h5>
        <input
          value={jobForm.description}
          onChange={(e) => {
            setError(null);
            setJobForm({
              ...jobForm,
              description: e.target.value,
            });
          }}
        ></input>

        <h5>EmployerEmail:</h5>
        <input
          value={jobForm.employerEmail}
          onChange={(e) => {
            setError(null);
            setJobForm({
              ...jobForm,
              employerEmail: e.target.value,
            });
          }}
        ></input>

        <h5>Company Link:</h5>
        <input
          value={jobForm.companyLink}
          onChange={(e) =>
            setJobForm({
              ...jobForm,
              companyLink: e.target.value,
            })
          }
        ></input>
        {/* <h5> Post Date:</h5>
        <input
          value={jobForm.postdate}
          onChange={(e) =>
            setJobForm({
              ...jobForm,
              postdate: e.target.value,
            })
          }
        ></input> */}
        <button id="sub-btn" onClick={onSubmitAddJobButtonClick}>
          <b>Submit</b>
        </button>
        <p id='msg'><b>{errorMsg}</b></p>
      </section>
    </div>
  );
}
