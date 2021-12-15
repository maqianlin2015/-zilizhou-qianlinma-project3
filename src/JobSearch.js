// function App() {
//     const navigate = useNavigate();
//     const [formInput, setFormInput] = useState('');
//     const [searchedJob, setSearchedJob] = useState('');
//     const [searchedResult, setSearchedResult] = useState([]); 
//     const [errorMsg, setError] = useState(null);

//     function onSearchButtonClick() {
//         if (!formInput) {
//             setError("You must type in a job title");
//             return;
//         }

//         axios.get('/api/jobs/find/' + formInput)
//             .then(response => {
//                 setSearchedResult(response.data)
//                 console.log(searchedResult);
//                 navigate("/jobSearchResult", { state: { searchedJob: searchedJob } })
//             })
//             .catch(error => setError(error));
//     }

//     return (
//         <div>
//             {errorMsg}
//             <input type='text' value={formInput}
//                 onChange={(e) => {
//                     setError(null);
//                     setFormInput(e.target.value)

//                 }} />
//             <button onClick={onSearchButtonClick}>
//                 Search Jobs
//             </button>
//             <div>
//                 Searched Job Title: {searchedJob.title}
//             </div>
//         </div>
//     );
// }

// export default App;



import { useState } from 'react';
import axios, { Axios } from 'axios';
// import { now } from 'mongoose';
// import { useNavigate } from 'react-router';


function App() {
    const [formInput, setFormInput] = useState('');
    const [job, setJob] = useState({
        title: 'No job selected',
    })
    const [errorMsg, setError] = useState(null);

    function onSearchButtonClick() {

        if (!formInput) {
            setError("You must type in a job title.");
            return;
        }

        axios.get('/api/jobs/find/:' + formInput)
            .then(response => setJob(response.data))
            .catch(error => setJob({
                title: "No job found",
            }));
    }

    return (
        <div>
            {errorMsg}
            <input type='text' value={formInput}
                onChange={(e) => {
                    setError(null);
                    setFormInput(e.target.value)

                }} />
            <button onClick={onSearchButtonClick}>
                Search for Job
            </button>
            <div>
                Job Title: {job.title}
            </div>
        </div>
    );
}

export default App;
