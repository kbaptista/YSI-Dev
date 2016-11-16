var User = require('../models/user');
var auth = require('../middleware/authentication');
var jwt = require('jwt-simple');
var config = require('../../config/db');

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

exports.getInfo = function(req, res){
  var token = auth.getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            name: decoded.name

        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
};

exports.getUserConnected = function(req, res){
    var token = auth.getToken(req.headers);
    if(token){
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            email: decoded.email
        }, function(err,user){
            if(err) throw err;

            if(!user){
                return res.status(403).send({msg: 'Auth failed. User not fount'});
            }
            else{
                res.status(200).send({id: decoded._id, email: decoded.email, name: decoded.name, password: decoded.password, idProjects: decoded.idProjects});
            }
        })
    }
    else{
        return res.status(403).send({msg: 'No token provided'});
    }
};