import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import "./style/Job.css";

export default function () {
    const jobId = useParams().jobId;
    const [job, setJob] = useState(null);

    function findJobDetails() {
        console.log("进入findJobDetail函数");
        axios.get('/api/jobs/find/findById/' + jobId)
            .then(response => setJob(response.data))
            .catch(error => console.log("Could not find Job"));
    }

    useEffect(findJobDetails, []);
    console.log(job); 

  

    const jobDetailComponent = job ? 
    
    (
        job.map(j => {
            return (<>
            
                <div> <b>Job Title:</b> {j.title} </div>
                <div> <b>Company:</b> {j.companyName} </div>     
                <div> <b>Location:</b> {j.location} </div>     
                <div> <b>Description:</b> {j.description}</div>     
                <div> <b>Employer Email:</b> <a href="mailto:m.bluth@example.com">{j.employerEmail}</a> </div>     
                {j.companyLink  && <div> <b>Company Link:</b>{j.companyLink} </div>}     
                <div> <b>Post Date:</b> {j.postdate} </div>     
                

            </>)
        }) 
    ) :
        (<div> No Job found </div>);
    return (
        <div>
            <h1 className="favoriate_result">Details: </h1>
            <section id="job-detail"> {jobDetailComponent} </section>
        </div>
    )
}