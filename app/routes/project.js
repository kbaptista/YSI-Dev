var Project = require('../models/project').model;

exports.allProjects = function(req,res){
    Project.find({}, function(err,docs){
        if(!err){
            var projects = [];
            for(var i = 0; i < docs.length; ++i){
                projects.push(docs[i]);
            }
            res.status(200).send(projects);
        }
        else{
            console.error(err);
            res.status(500).send(err);
        }
    });
};

exports.findById = function(req,res){
    try{
        Project.findById(req.params.id, function(err,project){
            if(!err){
                if(project){
                    res.status(200).send(project);
                }
                else{
                    res.status(404).send({
                        errorCode: 'PROJECT_NOT_FOUND',
                        message: 'Project ' +req.params.id + ' was not found'
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


exports.createProject = function(req,res){
    var project = new Project({
        idProductOwner: req.body.po,
        startDate: req.body.start,
        nbSprint: req.body.nbSprint,
        dureeSprint: req.body.duree,
        name: req.body.name,
        description: req.body.description
    });

    project.save(function(err,projects){
        if(!err){
            res.status(200).send(projects);
        }
        else{
            console.log(err);
            res.status(500).send(err);
        }
    })
};

