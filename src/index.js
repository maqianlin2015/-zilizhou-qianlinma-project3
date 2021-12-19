import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Register from "./Register";
import HomePage from "./HomePage";
import AddJob from "./AddJob";
import JobDetails from "./JobDetails";
import JobSearch from "./JobSearch";
import JobSearchResult from "./JobSearchResult";
import Login from "./Login";
import MyFavoriteJob from "./MyFavoriteJob";
import { UserContextProvider } from "./UserContext";
import Navbar from "./NavBar";

ReactDOM.render(
  <Router>
    {/* <Logout /> */}
    <UserContextProvider>
      <Navbar />
      <Routes>
        <Route exact path={"/"} element={<HomePage></HomePage>} />
        <Route path="/addJob" element={<AddJob />} />
        <Route path="/job/:jobId" element={<JobDetails />} />
        <Route path="/jobSearch" element={<JobSearch />} />
        <Route
          path="/jobSearch/:jobSearchQuery"
          element={<JobSearchResult />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myFavorite/:myusername" element={<MyFavoriteJob />} />
      </Routes>
    </UserContextProvider>
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
