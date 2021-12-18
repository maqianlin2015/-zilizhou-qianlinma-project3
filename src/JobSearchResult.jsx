import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import UserNavBar from "./UserNavBar";
// import NavBar from "./NavBar";
import { useNavigate } from "react-router";
import "./style/Job.css";

export default function JobSearchResult() {
  const [selectedJob, setSelectedJob] = useState([]);
  const jobSearchQuery = useParams().jobSearchQuery;
//   const [currentUserName, setCurrentUserName] = useState(null);
//   const navigate = useNavigate();

  function findSelectedJob() {
    axios
      .get("/api/jobs/find/findByTitle/" + jobSearchQuery)
      .then((response) => {
        setSelectedJob(response.data);
      })
      .catch((error) => console.error(error));
  }

//   function checkLogin() {
//     console.log("1");
//     axios
//       .get("/api/users/whoIsLoggedIn")
//       .then((response) => {
//         console.log("Success");
//         // console.log(response);
//         setCurrentUserName(response.data);
//       })
//       .catch(() => navigate("/login"));
//   }

//   useEffect(checkLogin, []);

//   function checkLogout() {
//     console.log("2");
//     axios
//       .get("/api/users/logout")
//       .then((response) => {
//         console.log("Logout!");
//         // console.log(response);
//         setCurrentUserName(null);
//       })
//       .catch(() => navigate("/"));
//   }

//   useEffect(checkLogout, []);

  console.log("this is selected jobs:");
  console.log(selectedJob);
  useEffect(findSelectedJob, []);

//   console.log("curUserName" + currentUserName);
//   const tmp = currentUserName ? <UserNavBar /> : <NavBar />;

  const jobListComponent = selectedJob.map((job) => {
    return (
      <>
        <p>
          {/* 别忘了job前面加/ */}
          <Link to={"/job/" + job.id}>
            {job.title} - {job.location} - {job.companyName}
          </Link>
        </p>
      </>
    );
  });

  return (
    <div>
      {/* {tmp} */}
      <UserNavBar/>
      <h1 className="favoriate_result">These are search result the jobs: </h1>
      <section id="link">{jobListComponent}</section>
    </div>
  );
}
