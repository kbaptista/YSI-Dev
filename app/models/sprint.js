var mongoose = require('mongoose');
var US = require('./userStory').model;

var sprintSchema = new mongoose.Schema();
sprintSchema.add({
    name : String,
    startDate : Date,
    deadLine : Date,
    idProject : String,
    usNames: [String],
    us : [{type : mongoose.Schema.Types.ObjectId, ref: 'UserStroy'}] // pour créer une référence vers une US (ici un tableau de US)
});

var Sprint = mongoose.model('Sprint',sprintSchema);
exports.schema = sprintSchema;
exports.model = Sprint;