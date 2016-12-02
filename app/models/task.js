var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema();
taskSchema.add({
    name : String,
    description : String,
    idUs: String,
    usName: String,
    developper : String,
    state : {
        type: String,
        enum: ['todo', 'ongoing','done']
    }
});

var Task = mongoose.model('Task', taskSchema);
exports.schema = taskSchema;
exports.model = Task;

