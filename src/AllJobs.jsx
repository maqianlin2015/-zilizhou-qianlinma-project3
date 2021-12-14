import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

export default function JobSearchBar() {
    const [allJob, setAllJob] = useState([]);

    function findAllJob() {
        axios.get('api/jobs/findAll/')
            .then(response => {
                setAllJob(response.data)
            })
            .catch(error => console.error(error));
    }

    console.log('this is all jobs:' + allJob);
    useEffect(findAllJob, []);

    const jobListComponent = allJob.map(job => {
        return (<>
        <p>{job.title}</p>
        {/* <Link to={"pokemon/" + pokemon.name}>{pokemon.name}</Link> */}
        </>)
    })

    return (
        <div>
            <h1>These are all my Pokemon</h1>
            {jobListComponent}
        </div>
    )
}