var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.isCampgroundAuthor = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, campground){
            if(err || !campground)  {
                req.flash("error", "Campground not found");
                res.redirect("back");
            }
            else {
                if(campground.author.id.equals(req.user._id)){
                     next();
                } else {
                    req.flash("error", "You are not the author of this Campground.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please Login");
        res.redirect("back");
    }
}

middlewareObj.isCommentAuthor = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.commentId, function(err, comment) {
            if(err || !comment) res.redirect("back");
            else{
                if(comment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You are not the author of this Comment.");
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("/login");
    }    
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login.");
    // Give the access to the flash message on the next request
    res.redirect("/login");    
}



module.exports = middlewareObj;