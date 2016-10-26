var passport = require('passport');

exports.showLoginPage = function(req,res){
  res.render('login.ejs', {message : req.flash('loginMessage')});
};

exports.logout = function(req, res){
  req.logout();
  res.status(200).send();

};