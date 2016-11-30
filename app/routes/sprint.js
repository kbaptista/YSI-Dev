var sprintModel = require('../models/sprint').model;
var project = require('../models/project').model;
var taskModel = require('../models/task').model;

exports.SprintFromProject = function(req,res){
    sprintModel.find({}, function(err,docs){
        if(!err){
            var sprints = [];
            for(var i = 0; i < docs.length; ++i){
                if (req.params.id.toString().localeCompare(docs[i].idProject) == 0)
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

exports.getTasks = function (req,res) {
    taskModel.find({},function (err,docs) {
        if (!err) {
            var tasks = [];
            for (var i = 0; i < docs.length; ++i) {
                tasks.push(docs[i]);
            }
            res.status(200).send(tasks);
        } else {
            console.error(err);
            res.status(500).send(err);
        }
    })
};

exports.createSprint = function(req,res){
    var sprint = new sprintModel({
        name:req.body.name,
        startDate : req.body.startDate,
        deadLine :req.body.deadLine,
        us: req.body.us,
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

exports.createTask = function(req,res){
    var task = new taskModel({
        name:req.body.name,
        description:req.body.description,
        idUs: req.body.idUs,
        usName: req.body.usName,
        state:req.body.state
    });

    task.save(function(err, Task){
        if(!err){
            res.status(200).send(Task);
        }
        else{
            console.log(err);
            res.status(500).send(err);
        }
    });
};

exports.removeSprint = function (req,res) {
    var id = req.params.id;
    sprintModel.remove({_id:id},function (err) {
        res.json({result: err? 'error': 'Sprint deleted!'+id });
    });
};

exports.removeTask = function (req,res) {
    var id = req.params.id;
    taskModel.remove({_id:id},function (err) {
        res.json({result: err? 'error': 'task deleted!'+id });
    });
};

exports.getSprintById = function (req, res) {
    var id = req.params.id;
    sprintModel.findById({_id:id},function (err,data) {
        if(!err){
            res.status(200).send(data);
        }
        else{
            console.error(err);
            res.status(500).send(err);
        }
    });
};

exports.addUsToSprint = function(req, res){
    var find = false;
    sprintModel.findById(req.params.id, function(err, sprint){
        if(!err){
            if(sprint) {
                if (req.body.us && req.body.usNames) {
                    sprint.us.forEach(function(element){
                        console.log(element.toString());
                        console.log(req.body.us._id);
                       if(element.toString() === req.body.us._id ){ // US déjà présente dans le sprint
                            find = true;
                       }
                    });
                    if(find == false) {
                        sprint.usNames.push(req.body.usNames);
                        sprint.us.push(req.body.us._id);
                        sprint.save();
                        res.status(200).send(sprint);
                    }
                    else{
                        res.status(409).send('US ' + req.body.us.name + ' already exists in the sprint');
                    }
                }
            }
            else{
                res.status(404).send(err);
            }
        }
        else{
            console.error(err);
            res.status(500).send(err);
        }

    })
};

exports.updateSprint = function (req, res) {
    sprintModel.findById(req.params.id, function(err, sprint){
        if(!err){
            if(sprint){
                if(req.body.us)
                    sprint.us = req.body.us._id;

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


exports.UpdateStateTask = function (req, res) {
    taskModel.findById(req.params.id, function(err, task){
        if(!err){
            if(task){
                if(req.body.state){
                    task.state = req.body.state;
                    task.save();
                    res.status(200).send(task);
                }
            }
            else{
                res.status(404).send(err);
            }
        }
        else{
            console.error(err);
            res.status(500).send(err);
        }
    });
};

exports.getTaskById = function(req,res){
    taskModel.findById({_id:req.params.id},function (err,data) {
        if(!err){
            res.status(200).send(data);
        }
        else{
            console.error(err);
            res.status(500).send(err);
        }
    });
};

exports.getTasksFromSprint = function(req,res){
  sprintModel.findById(req.params.id, function(err,sprint){
    if(!err){
        if(sprint){
            var tasks = [];
            sprint.us.forEach(function(elemUS){
                elemUS.tasks.forEach(function(elemTask){
                    tasks.push(elemTask);
                });
            });
            res.status(200).send(tasks);
        }
        else{
            res.status(404).send(err);
        }
    }
      else{
        console.error(err);
        res.status(500).send(err);
    }
  });
};

exports.getUsFromSprint = function(req,res){
  sprintModel.findById(req.params.id).populate('us').exec(function(err,sprint){
      if(!err){
          if(sprint){
              res.status(200).send(sprint.us);
          }
          else{
              res.status(404).send(err);
          }
      }
      else{
          console.error(err);
          res.status(500).send(err);
      }

  });
};