var User = require('../models/user').model;

exports.allUsers = function(req, res){
    User.find({}, function(err,docs){
        if(!err) {
            var users = [];
            for(var i = 0; i < docs.length; ++i) {
                users.push(docs[i]);
            }
            res.status(200).send(users);
        }
        else{
            console.error(err);
            res.status(500).send(err);
        }
    });
};

exports.findById = function(req,res){
    try{
        User.findById(req.params.id, function(err,user){
            if(!err){
                if(user){
                    res.status(200).send(user);
                }
                else{
                    res.status(404).send({
                        errorCode: 'USER_NOT_FOUND',
                        message: 'User ' +req.params.id + ' was not found'
                    });
                }
            }
            else{
                console.error(err);
                res.status(500).send;
            }
        });
    } catch(e){
        console.log(e);
        res.send(500);
    }
};