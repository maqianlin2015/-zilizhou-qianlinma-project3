const mongoose = require("mongoose")
const JobSchema = require('../schema/Job.Schema').JobSchema
const JobModel = mongoose.model("Job", JobSchema);

function insertJob(job) {
    return JobModel.create(job);
}

// 获得所有的jobs 列表
function getAllJobs() {
    return JobModel.find().exec();
}
// 这个是必须一字不差的，input title是处理了大小写之后的
function findJobByTitleExactly(title) {
    return JobModel.find({title: title}).exec();
}

// 题目要求，我认为就是里面有就可以了，title是处理了大小写之后的
// 用到： 与查询数组中指定的值中的任何一个匹配  $in
// Model.find({ age: { $in: [16, 18]} })  返回 age 字段等于 16 或者 18 的所有 document。
function findJobByTitle(title) {
    return JobModel.find({title: { $in: [title]} }).exec();
}

function findJobByLocation(location) {
    return JobModel.find({
        location: location
    }).exec();
}
//JobModel.findById 我觉得不能这么用， 所以从新写了
function findJobById(id) {
    return JobModel.find({
        id: id
    }).exec();
}


module.exports = {
    findJobByTitle,
    insertJob,
    findJobByLocation,
    getAllJobs,
    findJobByTitleExactly,
    findJobById
};