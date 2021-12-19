const express = require("express");
const auth_middleware = require("./auth_middleware");
const router = express.Router();
const JobAccessor = require("./models/Job.Model");

router.get("/findAll", function (request, response) {
  return JobAccessor.getAllJobs()
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

router.get("/find/findById/:jobId", (request, response) => {
  const jobIdSearch = request.params.jobId;
  return JobAccessor.findJobById(jobIdSearch)
    .then((jobResponse) => {
      if (!jobResponse) {
        response.status(404).send("Job not found");
      } else {
        response.status(200).send(jobResponse);
      }
    })
    .catch((error) => response.status(500).send("Issue getting job"));
});

router.get("/find/findByTitle/:searchTitle", (request, response) => {
  const searchTitle = request.params.searchTitle;
  console.log("this is searchTitle: " + searchTitle);
  const caseInsensitiveSearchTitle = searchTitle.toLowerCase();
  return JobAccessor.findJobByTitle(caseInsensitiveSearchTitle)
    .then((jobResponse) => {
      if (!jobResponse) {
        response.status(404).send("Job not found");
      }
      response.send(jobResponse);
    })
    .catch((error) => response.status(500).send("Issue getting job"));
});

router.post("/create", auth_middleware, (request, response) => {
  const job = request.body;

  if (
    !job.id ||
    !job.title ||
    !job.location ||
    !job.companyName ||
    !job.description ||
    !job.employerEmail ||
    !job.postdate
  ) {
    return response.status(422).send("Missing data");
  }

  JobAccessor.insertJob(request.body)
    .then((jobResponse) => response.status(200).send(jobResponse))
    .catch((error) => response.status(400).send(error));
});

module.exports = router;
