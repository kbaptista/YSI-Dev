//var localStrategy = require('passport-local').Strategy;
var jwtStrategy = require('passport-jwt').Strategy;
var User = require('../models/user');
var config = require('../../config/db');

module.exports = function(passport) {
    var opts = {};
    opts.secretOrKey = config.secret;
    passport.use(new jwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};

/*module.exports = function(passport){
    passport.serializeUser(function(user,done){
        done(null,user.id);
    });

    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            done(err,user);
        });
    });

    passport.use('local-signup', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function(req,email,password,done){
            if(email){
                email = email.toLowerCase();
            }
            process.nextTick(function(){
                User.findOne({ 'email' : email}, function(err, user){
                    if(err){
                        return done(err);
                    }
                    if(user){
                        return done(null,false,req.flash('signupMessage','That email ' + email + ' is already taken !'));
                    }
                    else{
                        var newUser = new User();
                        newUser.email = email;
                        newUser.name = req.body.name;
                        newUser.password = newUser.generateHash(password);

                        newUser.save(function(err){
                            if(err)
                                return done(err);
                            return done(null,newUser);
                        });
                    }
                });
            });
        }));

    passport.use('local-login', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function(req,email,password,done){
            if(email)
                email = email.toLowerCase();

            process.nextTick(function(){
                User.findOne({'email' : email}, function(err,user){
                    if(err)
                        return done(err);
                    if(!user || !user.validPassword(password))
                        return done(null,false,req.flash('loginMessage','No user found or wrong password !'));

                    return done(null,user);
                });
            });
    }));
}; */

