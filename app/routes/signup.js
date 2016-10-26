var passport = require('passport');

exports.showSignupPage = function(req, res){
    res.render('signup.ejs', {message : req.flash('signupMessage')});
};