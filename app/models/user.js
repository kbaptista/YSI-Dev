var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema();
userSchema.add({
    name: String,
    email: String,
    password: String,
    idProjects: []
});

userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password);
};

var User = mongoose.model('User',userSchema);

exports.schema = userSchema;
exports.model = User;