import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

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
    console.log(job); // 所以job这里是一个{} of []

    const jobDetailComponent = job ? 
    
    (
        job.map(j => {
            return (<>
                <div> Job Title: {j.title} </div>
                <div> Company: {j.companyName} </div>     
                <div> Location: {j.location} </div>     
                <div> Description: {j.description} </div>     
                <div> Emploter Email: {j.employerEmail} </div>     
                <div> Company Link: {j.companyLink} </div>     
                <div> Post Date: {j.postdate} </div>     
        

            </>)
        }) 
    ) :
        (<div> No Job found </div>);
    return (
        <div>
            <h1>Details: </h1>
            {jobDetailComponent}
        </div>
    )
}