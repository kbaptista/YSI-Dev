var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema();
taskSchema.add({
    name : String,
    description : String,
    idUs: String,
    usName: String,
    etat : String
});

var Task = mongoose.model('Task', taskSchema);
exports.schema = taskSchema;
exports.model = Task;

