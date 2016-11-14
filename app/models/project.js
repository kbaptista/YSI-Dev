var mongoose = require('mongoose');
var User = require('./user').schema;

var projectSchema = new mongoose.Schema();
projectSchema.add({
    idProductOwner : String,
    idScrumMaster : String,
    developpers : [User],
    startDate : Date,
    nbSprint : Number,
    dureeSprint : Number,
    name : String,
    isPrivate : Boolean,
    description : String
});

var Project = mongoose.model('Project',projectSchema);
exports.schema = projectSchema;
exports.model = Project;