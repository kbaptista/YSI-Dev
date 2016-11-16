var mongoose = require('mongoose');

var sprintSchema = new mongoose.Schema();
sprintSchema.add({
    name : String,
    startDate : Date,
    deadLine : Date,
    idProject : String
});

var Sprint = mongoose.model('Sprint',sprintSchema);
exports.schema = sprintSchema;
exports.model = Sprint;