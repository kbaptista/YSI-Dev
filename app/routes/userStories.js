var US = require('../models/userStory').model;

exports.UsFromProject = function(req,res){
    US.find({}, function(err,docs){
        if(!err){
            var userStories = [];
            for(var i = 0; i < docs.length; ++i){
                if (req.params.id == docs[i].idProject)
                userStories.push(docs[i]);
            }
            res.status(200).send(userStories);
        }
        else{
            console.error(err);
            res.status(500).send(err);
        }
    });
};

exports.createUserStories = function(req,res){
    var us = new US({
        name : req.body.name,
        description :req.body.description,
        effort : req.body.effort,
        priority :req.body.priority,
        //idTasks : req.body.
        idProject :req.body.idProject
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

exports.removeUserStory = function (req,res) {
    var id = req.params.id;
    console.log(id);
    US.remove({_id:id},function (err) {
        res.json({result: err? 'error': 'Us deleted!'+id });
    });
};

exports.getUserStory = function (req, res) {
    var id = req.params.id;
    console.log(id);
    US.findById({_id:id},function (err,data) {
        if(!err){
            var UserStory = data;
            res.status(200).send(UserStory);
        }
        else{
            console.error(err);
            res.status(500).send(err);
        }
    });
};

exports.updateUserStory = function (req, res) {

};