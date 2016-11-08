var US = require('../models/userStory').model;

exports.createUserStories = function(req,res){
    var us = new US({

        description :req.body.description,
        effort : req.body.effort,
        priority :req.body.priority
        //idTasks : req.body.
        //idProject :req.body.
    });

    us.save(function(err,Us){
        if(!err){
            res.status(200).send(Us);
        }
        else{
            console.log(err);
            res.status(500).send(err);
        }
    })
};