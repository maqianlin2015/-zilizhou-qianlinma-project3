import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function JobSearchBar() {
    const [jobList, setJobList] = useState([]);

    let location = useLocation();
    let searchedJob = location.state;
    console.log(searchedJob);
    // response.data 用法
    function findSearchedJobs() {
        axios.get('/api/jobs/find/' + {searchedJob})
            .then(response => {
                setJobList(response.data)
            })
            .catch(error => console.error(error));
    }

    // 任何page
    useEffect(findSearchedJobs, []);
    // 下面，当你click，进入
    const jobListComponent = jobList.map(job => {
        return (<>
        <p></p>
        <Link to={"/api/jobs/" + job.title}>{job.title}</Link>
        </>)
    });

    return (
        <div>
            <h1>These are all the searched jobs: </h1>
            {jobListComponent}
        </div>
    )
}