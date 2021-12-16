import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router";
import "./style/HomeSearchPage.css";


export default function SearchPage() {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState('');
  const [job, setJob] = useState({
    title: 'No job selected',
  })

  const [errorMsg, setError] = useState(null);

  function onSearchButtonClick() {
    if (!formInput) {
      setError("You must type in a Job name.");
      return;
    } else {
      navigate("/jobSearch/" + formInput);
    }
  }

  return (
    <div>
      <section id="search_box">
      {errorMsg}
      <input type='text' value={formInput}
        onChange={(e) => {
          setError(null);
          setFormInput(e.target.value)
        }} />
        </section>
      <button id ="btn" onClick={onSearchButtonClick}>
        Search for Job
      </button>
    </div>
  )
}
  