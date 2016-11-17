var mongoose = require('mongoose');
var Task = require('./task').schema;
var Sprint = require('./sprint').schema;

var usSchema = new mongoose.Schema();
usSchema.add({
    name : String,
    description : String,
    effort : Number,
    priority : Number,
    tasks : [Task],
    sprint: Sprint,
    idProject : String
});

var UserStory = mongoose.model('UserStroy',usSchema);
exports.schema = usSchema;
exports.model = UserStory;