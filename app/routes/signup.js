var User = require('../models/user');

exports.showSignupPage = function(req, res){
    res.render('signup.ejs', {message : req.flash('signupMessage')});
};


exports.jwtSignup = function(req,res){
    if (!req.body.name || !req.body.password) {
        res.json({success: false, msg: 'Please pass name and password.'});
    }
    User.findOne({'name' : req.body.name}, function(err,user){
        if(err)
            return done(err);
        if(user){
            res.json({success: false, msg: 'Userneame already exists'});
        }

    else {
        var newUser = new User({
            name: req.body.name,
            password: req.body.password
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                return done(err);
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }});
};