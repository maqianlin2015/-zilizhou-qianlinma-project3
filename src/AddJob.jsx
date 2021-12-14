import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function AddJob(props) {
    const navigate = useNavigate();
    const [jobForm, setJobForm] = useState({
        title: '',
        location: '',
        companyName: '',
        description: '',
        employerEmail: '',
        companyLink: '',
        postdate: '',
    });
    const [myJob, setMyJob] = useState([])

    // 用axios making api request to local node server    
    // axios.get(one url)是从前段往后端发送get信息，根据url，return的东西叫“promise”
    // promise is Java scripts way of doing asynchronous data handling.
    // 既然promise回来了，我要access to this data and use it

    // axios有一个async问题

    // function getMyPokemon() {
    //     axios.get('/api/job/myjob')
    //         .then(response => setMyPokemon(response.data))
    //         .catch(error => console.log(error));
    // }


    // useEffect(getMyPokemon, []);


    const jobElement = [];
    for (let job of myJob) {
        jobElement.push(<div>{job.title} - {job.location} - {job.companyName}</div>);
    }


    return (
        <div>
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

            <button onClick={
                () => axios.post('/api/jobs/createJob/', jobForm)
                    .then(response => {
                        // getMyJob()
                        console.log(response)
                    })
                    .catch(error => console.error(error))
            }>
                Submit
            </button>
            {jobElement}
        </div>
    )


}