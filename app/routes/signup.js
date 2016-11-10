var User = require('../models/user');

exports.showSignupPage = function(req, res){
    res.render('signup.ejs', {message : req.flash('signupMessage')});
};


exports.jwtSignup = function(req,res){
    if (!req.body.email || !req.body.password) {
        res.status(412).send({success: false, msg: 'Please pass email and password.'});
    }
    User.findOne({'email' : req.body.email}, function(err,user){
        if(err)
            return done(err);
        if(user){
            res.status(409).send({success: false, msg: 'User with email already exists'});
        }

    else {
        var newUser = new User({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                return done(err);
            }
            res.status(200).send({success: true, msg: 'Successful created new user.'});
        });
    }});
};