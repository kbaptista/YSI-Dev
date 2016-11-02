var mongoose = require('mongoose');

var taskSchema = new mongoose.schema();
taskSchema.add({
    name : String,
    description : String
});

var Task = mongoose.model('Task',projectSchema);
exports.schema = taskSchema;
exports.model = Task;