// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useParams } from 'react-router';

// export default function JobSearchResultList() {
//     const [jobSearchResultList, setJobSearchResultList] = useState([]);

//     function findSearchedJobs() {
//         const jobSearchQuery = useParams().jobSearchQuery;
//         axios.get('api/jobs/find/' + jobSearchQuery)
//             .then(response => {
//                 setJobSearchResultList(response.data)
//             })
//             .catch(error => console.error(error));
//     }

//     useEffect(findSearchedJobs, []);

//     const jobListComponent = jobSearchResultList.map(job => {
//         return (<>
//         <p></p>
//         <Link to={"jobs/" + job.title}>{job.title}</Link>
//         </>)
//     })

//     return (
//         <div>
//             <h1>These are all the job search results: </h1>
//             {jobListComponent}
//         </div>
//     )
// }