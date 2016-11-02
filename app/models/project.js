var mongoose = require('mongoose');

var projectSchema = new mongoose.schema();
projectSchema.add({
    idProductOwner : String,
    idScrumMaster : String,
    idDeveloppers : [],
    startDate : Date,
    nbSprint : Number,
    dureeSprint : Number,
    name : String,
    description : String
});

var Project = mongoose.model('Project',projectSchema);
exports.schema = projectSchema;
exports.model = Project;