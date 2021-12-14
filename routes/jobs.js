const express = require('express');
const auth_middleware = require('./auth_middleware');
const router = express.Router();
const JobAccessor = require('./models/Job.Model');

// Returns all known job
router.get('/findAll', function(request, response) {
  return JobAccessor.getAllJobs()
    .then(jobResponse => response.status(200).send(jobResponse))
    .catch(error => response.status(400).send(error))
})

router.get('/find/:searchTitle', (request, response) => {
    const searchTitle = request.params.searchTitle;
    const caseInsensitiveSearchTitle =  searchTitle.toLowerCase();
    return JobModel.findJobByTitle(caseInsensitiveSearchTitle)
      .then((jobResponse) => {
          if(!jobResponse) {
              response.status(404).send("Job not found");
          }
  
          response.send(jobResponse)
      })
      .catch((error) => response.status(500).send("Issue getting job"))
  })

// router.get('/myPokemon', auth_middleware, function(request, response) {
//   return PokemonAccessor.findPokemonByOwner(request.username)
//   .then(pokemonResponse => response.status(200).send(pokemonResponse))
//   .catch(error => response.status(400).send(error))
 
// })


router.post('/createJob', auth_middleware, (request, response) => {
  const job = request.body;
  // 收到request body，要title转成小写的：
  job.title = job.title.toLowerCase();

  if(!job.title || !job.location || !job.companyName || !job.description || !job.employerEmail
    || !job.companyLink || !job.postdate) {
    return response.status(422).send("Missing data");
  }

// 加login的时候再弄:
//   pokemon.owner = request.username;

  JobAccessor.insertJob(request.body)
    .then(jobResponse => response.status(200).send(jobResponse))
    .catch(error => response.status(400).send(error))
})

module.exports = router;