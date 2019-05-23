var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");

var User = require("../models/user");
// REGISTER
router.get("/register", function(req, res){
      res.render("register");  
});
router.post("/register", function(req, res){
   var username = req.body.username;
   var password = req.body.password;
   User.register(new User({username: username}), password, function(err, newUser){
        if(err) {
            req.flash("error", err.message); 
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Yelp Camp "  + newUser.username); 
            res.redirect("/campgrounds");
        });
   });
});

// LOGIN
router.get("/login", function(req, res) {
    res.render("login");
})
router.post("/login", passport.authenticate("local",{
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }), function(req,res){
});

// LOGOUT
router.get("/logout",function(req, res){
    req.logout();
    req.flash("success", "You have logged out!");
    res.redirect("/campgrounds");
})

module.exports = router;