var mongoose = require('mongoose');

var sprintSchema = new mongoose.schema();
sprintSchema.add({
    name : String,
    startDate : Date,
    deadLine : Date
});

var Sprint = mongoose.model('Sprint',sprintSchema);
exports.schema = sprintSchema;
exports.model = Sprint;