var passport = require('passport');

exports.showProjectPage = function(req, res){
    res.render('project.ejs', {message : req.flash('ProjectMessage')});
};

exports.passportProject = passport.authenticate('local-project', {
    successRedirect: '/welcome',
    failureRedirect: '/project',
    failureFlash: true
});