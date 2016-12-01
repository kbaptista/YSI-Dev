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
        idProject :req.body.idProject,
        sprint: req.body.sprint,
        state: 'todo'
    });

    us.save(function(err,Us){
        if(!err){
            res.status(200).send(Us);
        }
        else{
            console.log(err);
            res.status(500).send(err);
        }
    });
};

exports.removeUserStory = function (req,res) {
    var id = req.params.id;
    US.remove({_id:id},function (err) {
        res.json({result: err? 'error': 'Us deleted!'+id });
    });
};

exports.getUserStoryById = function (req, res) {
    var id = req.params.id;
    US.findById({_id:id},function (err,data) {
        if(!err){
            res.status(200).send(data);
        }
        else{
            console.error(err);
            res.status(500).send(err);
        }
    });
};

exports.updateUserStory = function (req, res) {
    US.findById(req.params.id, function(err, us){
        if(!err){
            if(us){
                if(req.body.name)
                    us.name = req.body.name;
                if(req.body.description)
                    us.description = req.body.description;
                if(req.body.effort)
                    us.effort = req.body.effort;
                if(req.body.priority)
                    us.priority = req.body.priority;
                if(req.body.sprint)
                    us.sprint = req.body.sprint;
                if(req.body.tasks){
                    updateNameById(us.tasks,req.body.tasks._id,req.body.tasks.state)
                }
                if(req.body.state)
                    us.state = req.body.state;
                us.save();
                res.status(200).send(us);
            }
            else
                res.status(404).send(err);
        }
        else{
            console.error(err);
            res.status(500).send(err);
        }
    });
};

exports.addTracabilityToUserStory = function(req,res){
  US.findById(req.params.id, function(err,us){
      if(!err){
          if(us){
              us.commit = req.body.commit;
              us.save();
              res.status(200).send(us);
          }
          else{
              res.status(404).send(err);
          }
      }
      else{
          res.status(500).send(err);
      }
  })
};

exports.addTaskToUserStory = function(req,res){
  var find = false;
    US.findById(req.params.id, function(err, us){
       if(!err){
           if(us){
               if(req.body.task){
                   us.tasks.forEach(function(element){
                       if(element._id.toString().localeCompare(req.body.task._id) == 0){
                           find = true;
                       }
                   });
                   if(find == false){
                       us.tasks.push(req.body.task);
                       us.save();
                       res.status(200).send(us);
                   }
                   else{
                       res.status(409).send('tasks ' + req.body.task.name + ' already exists in the US');
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

    });
};

exports.getTasksFromUs = function(req,res){
    US.findById(req.params.id, function(err,us){
       if(!err){
           if(us){
               var tasks = [];
               us.tasks.forEach(function(element){
                  tasks.push(element);
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

function updateNameById(obj, id, value) {
    Object.keys(obj).some(function(key) {
        if (obj[key]._id == id) {
            obj[key].state = value;
            return true;  // Stops looping
        }
        // Recurse over lower objects
        else if (obj[key].groups) {
            return updateNameById(obj[key].groups, id, value);
        }
    })
}
