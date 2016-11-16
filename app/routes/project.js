var Project = require('../models/project').model;
var User = require('../models/user');

exports.allPublicProjects = function(req,res){
  Project.find({isPrivate: false}, function(err,result){
      if(!err){
          var projectsPublic = [];
          for(var i = 0;i < result.length; ++i){
              projectsPublic.push(result[i]);
          }
          res.status(200).send(projectsPublic);
      }
      else{
          console.error(err);
          res.status(500).send(err);
      }
  });
};

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
                    sendProjectNotFoundError(res,req)
                }
            }
            else{
                handleFindByIdError(err,res,req);
            }
        });
    } catch(e){
        console.log(e);
        res.send(500);
    }
};


exports.createProject = function(req,res){
    var project = new Project({
        productOwner: req.body.po,
        scrumMaster: req.body.sm,
        startDate: req.body.start,
        nbSprint: req.body.nbSprint,
        dureeSprint: req.body.duree,
        name: req.body.name,
        isPrivate : req.body.isPrivate,
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

exports.addUserToProject = function(req,res){
  Project.findById(req.params.id, function(err,project){
     if(!err){
         if(project){
             if(req.body){
                 var user = new User(req.body);
                 project.developpers.push(user.toJSON());
                 project.save();
                 res.status(200).send(project);
             }
             else{
                 res.status(412).send({
                     errorCode: 'REQUEST_BODY_REQUIRED',
                     message: 'Request body is missing'
                 });
             }
         }
         else{
            sendProjectNotFoundError(res,req);
         }
     }
      else{
         handleFindByIdError(err,res,req);
     }
  });
};

function handleFindByIdError(err, res, req) {
    console.error(err);
    if (err.name === 'CastError') {
        sendProjectNotFoundError(res, req);
    } else {
        res.status(500).send(err);
    }
}

function sendProjectNotFoundError(res, req) {
    res.status(404).send({
        errorCode: 'PROJECT_NOT_FOUND',
        message: 'Project ' + req.params.id + ' was not found'
    });
}