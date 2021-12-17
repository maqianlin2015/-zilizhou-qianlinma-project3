import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import UserNavBar from './UserNavBar';
const { v4: uuid } = require('uuid');

export default function AddJob(props) {
    const navigate = useNavigate();
    const [jobForm, setJobForm] = useState({
        id: uuid(),
        title: '',
        location: '',
        companyName: '',
        description: '',
        employerEmail: '',
        companyLink: '',
        postdate: '',
    });

    const [myJob, setMyJob] = useState([])

    function getMyJob() {
        axios.get('/api/jobs/findAll')
            .then(response => setMyJob(response.data))
            .catch(error => console.log(error));
    }
 

    function checkLogin() {
        axios.get('/api/users/whoIsLoggedIn')
            .then(() => console.log("Success"))
            .catch(() => navigate('/'))
    }

    useEffect(checkLogin, []);

    useEffect(getMyJob, []);



    const jobElement = [];
    for (let job of myJob) {
        jobElement.push(<div>{job.title} - {job.location} - {job.companyName}</div>);
    }


    return (
        
        <div>
            <UserNavBar />
            <section  className='job-container'>
            <h5>Title:</h5>
            <input value={jobForm.title}
                onChange={e => setJobForm({
                    ...jobForm,
                    title: e.target.value
                })} ></input>
            <h5>Location:</h5>
            <input value={jobForm.location}
                onChange={e => setJobForm({
                    ...jobForm,
                    location: e.target.value
                })} ></input>
            <h5>Company Name:</h5>
            <input value={jobForm.companyName}
                onChange={e => setJobForm({
                    ...jobForm,
                    companyName: e.target.value
                })} ></input>

            <h5>Description:</h5>
            <input value={jobForm.description}
                onChange={e => setJobForm({
                    ...jobForm,
                    description: e.target.value
                })} ></input>

            <h5>EmployerEmail:</h5>
            <input value={jobForm.employerEmail}
                onChange={e => setJobForm({
                    ...jobForm,
                    employerEmail: e.target.value
                })} ></input>

            <h5>Company Link:</h5>
            <input value={jobForm.companyLink}
                onChange={e => setJobForm({
                    ...jobForm,
                    companyLink: e.target.value
                })} ></input>

            <h5> Post Date:</h5>
            <input value={jobForm.postdate}
                onChange={e => setJobForm({
                    ...jobForm,
                    postdate: e.target.value
                })} ></input>

            <button id="sub-btn" onClick={
                () => axios.post('/api/jobs/create', jobForm)
                    .then(response => {
                        getMyJob()
                        console.log(response)
                    })
                    .catch(error => console.error( error))
            }> 
                <b>Submit</b>
            </button>
            </section>
            {jobElement}
        </div>
    )
}
