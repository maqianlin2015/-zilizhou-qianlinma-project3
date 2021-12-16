import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

export default function MyFavoriteJob() {
    const [myfavoriteJobsListID, setMyFavoriteJobsListID] = useState([]);
    const myusername = useParams().myusername;
    const [currentUser, setCurrentUser] = useState();
  
    const [jobArray, setJobArray] = useState([]); 

    // function checkLogin() {
    //     axios.get('/api/users/whoIsLoggedIn')
    //         .then(() => {
    //             console.log("Success");
    //             setCurrentUserName(req.session.username);
    //         })
    //         .catch(() => navigate('/login'))
    // }



//执行到25行24行没有更新完 
    // function getUserFavoriteJobIDList() {
    //     axios.get('/api/users/' + myusername)
    //         .then(response => {
    //             setCurrentUser(response.data);
    //             setMyFavoriteJobsListID(response.data.favorites);
    //             console.log(response.data.favorites);
    //         })
    //         .catch(error => console.error(error));
    // }



    function getUserFavoriteJobIDList() {
        axios.get('/api/users/findMyFavorites/' + myusername)
            .then(response => { 
                setMyFavoriteJobsListID(response.data);
                for (let jobId of response.data) {
                   axios.get('/api/jobs/find/findById/' + jobId)
                    .then(response => {
                        setJobArray([
                            ...jobArray,
                            response.data
                        ]);
                    }) 
                    .catch(error => console.log(error));
                }
                console.log(response.data);
            })
            .catch(error => console.error(error));
    }

    useEffect(getUserFavoriteJobIDList, []);
 
    // console.log(myFavoriteJobIdList);
    // useEffect(checkLogin, []);
  
    const favoritejobListComponent = jobArray.map(job => {
        console.log(job);
        return (<>
            <p>
                <Link to={"/job/" + job[0].id}>{job[0].title} - {job[0].location} - {job[0].companyName}</Link>
            </p>
        </>)
    })


    const helperComponent = (jobArray.length > 0) ?
    (<>
    {  console.log(jobArray)};
        {favoritejobListComponent}
    </>) :
    (<div></div>);

    // function findJob(jobId) { 
    //     axios.get('/api/jobs/find/findById/' + jobId)
    //         .then(response => {
    //             return response.data;
    //         })
    //         .catch(error => console.error(error));
    // }

    // console.log(myFavoriteList);

    // useEffect(findAllMyFavoriteJobs, []);

 

    return (
        <div>
            <h1>My favorite jobs: </h1>
            {helperComponent}
        </div>
    )
}