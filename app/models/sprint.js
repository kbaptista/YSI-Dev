var mongoose = require('mongoose');
var US = require('./userStory').schema;

var sprintSchema = new mongoose.Schema();
sprintSchema.add({
    name : String,
    startDate : Date,
    deadLine : Date,
    userStories:[US],
    idProject : String
});

var Sprint = mongoose.model('Sprint',sprintSchema);
exports.schema = sprintSchema;
exports.model = Sprint;