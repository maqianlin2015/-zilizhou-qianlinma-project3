import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import PokemonDetails from './PokemonDetails';
import PokemonList from './PokemonList';
import PokemonSearch from './PokemonSearch';
import reportWebVitals from './reportWebVitals';
import Register from './Register';
import PokemonTracker from './PokemonTracker';
import Logout from './Logout';
import AllJobs from './AllJobs';

import AddJob from './AddJob';
import JobDetails from './JobDetails';
import JobSearch from './JobSearch';
import JobSearchResult from './JobSearchResult';
import Login from './Login';
import MyFavoriteJob from './MyFavoriteJob';

ReactDOM.render(
  <Router>
    <Logout />
    <Routes>
       {/* <Route path="/alljobs" element={<AllJobs />} />  */}
       {/* <Route path="/alljobs/:jobId" element={<JobDetails />} /> */}
      <Route path="/addJob" element={<AddJob />} />  
      <Route path="/job/:jobId" element={<JobDetails />} />       
      <Route path="/jobSearch" element={<JobSearch />} /> 
      <Route path="/jobSearch/:jobSearchQuery" element={<JobSearchResult />} /> 
      <Route path="/" element={<Register />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/myFavorite/:myusername" element={<MyFavoriteJob />} />




      <Route path="/myPokemon" element={<PokemonTracker />} />
      <Route path="/list" element={<PokemonList />} />
      <Route path="/pokemonSearch" element={<PokemonSearch />} />
      <Route path="/pokemon/:pokemonName" element={<PokemonDetails />} />
    </Routes>
  </Router>
,
  document.getElementById('root')
);

reportWebVitals();
