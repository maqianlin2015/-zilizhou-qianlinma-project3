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

ReactDOM.render(
  <Router>
    <Logout />
    <Routes>
      <Route path="/add" element={<AddJob />} /> 
      <Route path="/alljobs" element={<AllJobs />} /> 
      <Route path="/jobSearch" element={<JobSearch />} /> 
      <Route path="/jobSearchResult" element={<JobList />} /> 
      <Route path="/" element={<Register />} />
      <Route path="/myPokemon" element={<PokemonTracker />} />
      <Route path="/list" element={<PokemonList />} />
      <Route path="/pokemonSearch/:searchQuery" element={<PokemonSearch />} />
      <Route path="/pokemon/:pokemonName" element={<PokemonDetails />} />
    </Routes>
  </Router>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
