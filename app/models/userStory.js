var mongoose = require('mongoose');
var Task = require('./task').schema;

var usSchema = new mongoose.Schema();
usSchema.add({
    name : String,
    description : String,
    effort : Number,
    priority : Number,
    tasks : [Task],
    idProject : String
});

var UserStory = mongoose.model('UserStroy',usSchema);
exports.schema = usSchema;
exports.model = UserStory;