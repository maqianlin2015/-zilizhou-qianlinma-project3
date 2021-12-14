import { useState } from 'react';
import axios, { Axios } from 'axios';
import { now } from 'mongoose';
import { useNavigate } from 'react-router';

// 这个地方叫App有什么特殊含义吗？是不是home 的意思
function App() {
    const navigate = useNavigate();
    const [formInput, setFormInput] = useState('');
    const [searchedJob, setSearchedJob] = useState('');
    const [searchedResult, setSearchedResult] = useState([]); 
    const [errorMsg, setError] = useState(null);

    function onSearchButtonClick() {
        if (!formInput) {
            setError("You must type in a job title");
            return;
        }
        // 这里应该这么处理嘛？下面是原来我写的：
        axios.get('/api/jobs/find/' + formInput)
            .then(response => {
                setSearchedResult(response.data)
                navigate("/jobSearchResult", { state: { searchedJob: searchedJob } })
            })
            .catch(error => setError(error));

        console.log("成功跑了onSearchButtonClick函数");
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
                Search Jobs
            </button>
            <div>
                Searched Job Title: {searchedJob.title}
            </div>
        </div>
    );
}

export default App;
