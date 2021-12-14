// 下面这些都是准备工作啦
// import mongoose，以及用到的Schema，用mongoose.model建立model，这样的话就可以用instance调用写好的function 
const mongoose = require("mongoose")
const JobSchema = require('../schema/Job.Schema').JobSchema
const JobModel = mongoose.model("Job", JobSchema);
// 下面的func帮我向mongodb query

// input是一个obj
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

// findById 有这个特殊的
// function findPokemonById(id) {
//     return PokemonModel.findById(id).exec();
// }


module.exports = {
    findJobByTitle,
    insertJob,
    findJobByLocation,
    getAllJobs,
    findJobByTitleExactly,
    // findPokemonById
};