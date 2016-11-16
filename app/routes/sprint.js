var sprintModel = require('../models/sprint').model;
var project = require('../models/project').model;

exports.CountSprintFromProject = function (req, res) {
    var id = req.params.id;
    project.findById({_id:id},function (err,data) {
        if(!err){
            var SprintCount = data.nbSprint;
            res.status(200).send(SprintCount);
        }
        else{
            console.error(err);
            res.status(500).send(err);
        }
    });
};

exports.SprintFromProject = function(req,res){
    sprintModel.find({}, function(err,docs){
        if(!err){
            var sprints = [];
            for(var i = 0; i < docs.length; ++i){
                if (req.params.id == docs[i].idProject)
                    sprints.push(docs[i]);
            }
            res.status(200).send(sprints);
        }
        else{
            console.error(err);
            res.status(500).send(err);
        }
    });
};

exports.createSprint = function(req,res){
    var sprint = new sprintModel({
        name:req.body.name,
        startDate : req.body.startDate,
        deadLine :req.body.deadLine,
        idProject :req.body.idProject
    });

    sprint.save(function(err,Sprint){
        if(!err){
            res.status(200).send(Sprint);
        }
        else{
            console.log(err);
            res.status(500).send(err);
        }
    })
};

 exports.removeSprint = function (req,res) {
    var id = req.params.id;
    sprintModel.remove({_id:id},function (err) {
        res.json({result: err? 'error': 'Sprint deleted!'+id });
    });
};

 exports.getSprintById = function (req, res) {
    var id = req.params.id;
    sprintModel.findById({_id:id},function (err,data) {
        if(!err){
            var sprint = data;
            res.status(200).send(sprint);
        }
        else{
            console.error(err);
            res.status(500).send(err);
        }
    });
};

 exports.updateSprint = function (req, res) {
    sprintModel.findById(req.params.id, function(err, sprint){
        if(!err){
            if(sprint){
                sprint.name = req.body.name;
                sprint.startDate = req.body.startDate;
                sprint.deadLine = req.body.deadLine;
                sprint.save();
                res.status(200).send(sprint);
            }
            else
                res.status(404).send(err);
        }
        else{
            console.error(err);
            res.status(500).send(err);
        }
    })
};