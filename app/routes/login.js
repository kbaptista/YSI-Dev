var passport = require('passport');

exports.showLoginPage = function(req,res){
  res.render('login.ejs', {message : req.flash('loginMessage')});
};

exports.logout = function(req, res){
  req.logout();
  res.status(200).send();
};

exports.passportLogin = passport.authenticate('local-login',{
  successRedirect: '/welcome',
  failureRedirect: '/login',
  failureFlash: true
});

exports.loggedIn = function(req,res){
  res.send(req.isAuthenticated()? req.user : '0');
};