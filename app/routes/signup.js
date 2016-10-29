var passport = require('passport');

exports.showSignupPage = function(req, res){
    res.render('signup.ejs', {message : req.flash('signupMessage')});
};

exports.passportSignup = passport.authenticate('local-signup', {
    successRedirect: '/welcome',
    failureRedirect: '/signup',
    failureFlash: true
});

exports.welcome = function(req,res){
    if(req.user){
        res.status(200).send({
            message: 'USER_SIGNED_UP_SUCCESSFULLY',
            user : {
                id: req.user._id,
                email: req.user.email,
                name: req.user.name
            }
        });
    }
};