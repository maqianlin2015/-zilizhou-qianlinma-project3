import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

export default function JobSearchResult() {
    const [selectedJob, setSelectedJob] = useState([]);
    const jobSearchQuery = useParams().jobSearchQuery;

    function findSelectedJob() {
        axios.get('/api/jobs/find/findByTitle/' + jobSearchQuery)
            .then(response => {
                setSelectedJob(response.data)
            })
            .catch(error => console.error(error));
    }

    console.log('this is selected jobs:');
    console.log(selectedJob);
    useEffect(findSelectedJob, []);

    const jobListComponent = selectedJob.map(job => {
        return (<>
            <p>
                {/* 别忘了job前面加/ */}
                <Link to={"/job/" + job.id}>{job.title} - {job.location} - {job.companyName}</Link>
            </p>
        </>)
    })

    return (
        <div>
            <h1>These are search result the jobs: </h1>
            {jobListComponent}
        </div>
    )
}