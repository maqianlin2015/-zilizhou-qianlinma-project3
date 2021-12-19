const mongoose = require("mongoose");
const JobSchema = require("../schema/Job.Schema").JobSchema;
const JobModel = mongoose.model("Job", JobSchema);

function insertJob(job) {
  return JobModel.create(job);
}

function getAllJobs() {
  return JobModel.find().exec();
}

function findJobByTitleExactly(title) {
  return JobModel.find({ title: title }).exec();
}

function findJobByTitle(title) {
  return JobModel.find({ title: { $regex: ".*" + title + ".*" } }).exec();
}

function findJobByLocation(location) {
  return JobModel.find({
    location: location,
  }).exec();
}

function findJobById(id) {
  return JobModel.find({
    id: id,
  }).exec();
}

module.exports = {
  findJobByTitle,
  insertJob,
  findJobByLocation,
  getAllJobs,
  findJobByTitleExactly,
  findJobById,
};
