var mongoose = require('mongoose');

var taskSchema = new mongoose.schema();
taskSchema.add({
    name : String,
    description : String,
    idUs : String
});

var Task = mongoose.model('Task',taskSchema);
exports.schema = taskSchema;
exports.model = Task;