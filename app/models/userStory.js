var mongoose = require('mongoose');

var usSchema = new mongoose.schema();
usSchema.add({
    name : String,
    description : String,
    effort : String,
    priority : String,
    idTasks : []
});

var UserStroy = mongoose.model('UserStroy',projectSchema);
exports.schema = usSchema;
exports.model = UserStroy;