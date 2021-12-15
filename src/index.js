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
import JobSearch from './JobSearch';
import JobList from './JobList';
import AllJobs from './AllJobs';
import AddJob from './AddJob';
import JobDetails from './JobDetails';
// import JobSearchResultList from './JobSearchResultList';

ReactDOM.render(
  <Router>
    <Logout />
    <Routes>
      <Route path="/addJob" element={<AddJob />} /> 
      <Route path="/alljobs" element={<AllJobs />} /> 
      <Route path="/jobSearch" element={<JobSearch />} /> 
      {/* <Route path="/jobSearch/:jobSearchQuery" element={<JobSearchResultList />} />  */}
      <Route path="/alljobs/:jobId" element={<JobDetails />} />

      <Route path="/" element={<Register />} />
      <Route path="/myPokemon" element={<PokemonTracker />} />
      <Route path="/list" element={<PokemonList />} />
      {/* <Route path="/pokemonSearch/:searchQuery" element={<PokemonSearch />} /> */}
      <Route path="/pokemonSearch" element={<PokemonSearch />} />
      <Route path="/pokemon/:pokemonName" element={<PokemonDetails />} />
    </Routes>
  </Router>
,
  document.getElementById('root')
);

reportWebVitals();
