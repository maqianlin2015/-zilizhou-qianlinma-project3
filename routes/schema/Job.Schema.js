//mongoose提供的class -> Schema 
const Schema = require('mongoose').Schema;

exports.JobSchema = new Schema({    
    title: String,
    location: String,
    companyName: String,
    description: String,
    employerEmail: String,
    companyLink: String,
    postdate: String,
}, { collection : 'jobs' });
// 最后一行，意思是，also create a collection called jobs 
