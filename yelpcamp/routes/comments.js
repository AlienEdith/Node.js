var express = require("express");
var router = express.Router({mergeParams: true});

var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middleware = require("../middleware/")
// NEW COMMENT
router.get("/new", middleware.isLoggedIn, function(req, res){
    var id = req.params.id;
    Campground.findById(id, function(err, campground) {
        if(err || !campground) console.log(err);
        else{
            res.render("./comments/new", {id: id, campground: campground});
        }
    });
});
// CREATE COMMENT
router.post("/", middleware.isLoggedIn, function(req, res){
    var id = req.params.id;
    Campground.findById(id, function(err, campground){
        if(err || !campground) console.log(err);
        else{
            Comment.create(req.body.comment,function(err, comment){
                if(err || !comment) console.log(err);
                else{
                    //Add user name and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment); //c.comment is an array
                    campground.save(function(err, campground){
                        if(err) console.log(err);
                        else{
                            req.flash("success", "You have successfully added a comment");
                            res.redirect("/campgrounds/"+campground._id);
                        }
                    })
                }
            })            
        }
    });
});

// EDIT
router.get("/:commentId/edit", middleware.isCommentAuthor, function(req, res){
    Comment.findById(req.params.commentId, function(err, comment){
        if(err || !comment)  res.redirect("back");
        else{
            res.render("./comments/edit", {campgroundId: req.params.id, comment: comment}); 
        }
    });           
});
// UPDATE
router.put("/:commentId", middleware.isCommentAuthor, function(req, res){
   Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, comment){
       if(err || !comment)  res.redirect("back");
       else {
           req.flash("success", "You have successfully updated this comment");
           res.redirect("/campgrounds/"+req.params.id);
       }
   }) ;
});

// DELETE
router.delete("/:commentId", function(req,res){
    Comment.findByIdAndRemove(req.params.commentId, function(err, comment){
        if(err || !comment) res.redirect("back");
        else{
            req.flash("success", "You have successfully deleted this comment");
            res.redirect("/campgrounds/"+req.params.id);
        };
    });
});


module.exports = router;