exports.isAuthenticated = function(req,res,next){
    return function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.send(401);
    }
};