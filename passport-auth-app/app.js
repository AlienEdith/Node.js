var express = require("express");
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var app = express();

mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");
var User = require("./models/users")

var passport = require("passport");
var passport_local = require("passport-local");
var passport_local_mongoose = require("passport-local-mongoose");
var express_session = require("express-session");

app.use(express_session({
    secret: "Just used to encode and decode the sessions we are going to store, for security purpose",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// Create a new local strategy using the User.authenticate() method that coming form p_l_mongoose
passport.use(new passport_local(User.authenticate()));
// encoding data, putting it back in the session
passport.serializeUser(User.serializeUser());     
// Reade session, take data from it and decoding data
passport.deserializeUser(User.deserializeUser()); 


app.get("/", function(req, res){
    res.render("home"); 
})
// Add a middleware to check whether user is logged in
function isLoggedIn(req, res, next){    // Standrad middleware
    // next: next thing that need to be called, Express take of it and knows what function to call next
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
// Run is LoggedIn first, if not logged in, redirect to login page
// if logged in, run next() => callback function
app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret"); 
})
// Auth Route
app.get("/register", function(req, res){
   res.render("register"); 
});

app.post("/register", function(req, res){
   var username = req.body.username;
   var password = req.body.password;
   User.register(new User({username: username}), password, function(err, newUser){
    //   Don't save password directly to the database
    //   User.register will hash(salt) the password and add it to the newUser
        if(err) {
            console.log(err);
            return res.redirect("/register");
        }
        // log the user in, take care of everything in the session, 
        // store the corrent information, serialized the information
        // with local stratrgy: other strategy twitter/facebook....
        passport.authenticate("local")(req, res, () => {
           res.redirect("/secret");
        });
   });
});

app.get("/login",function(req,res){
    res.render("login"); 
});
// passport.authenticate(...), middleware: codes runs after post request begin, but before final route callback. 
// automatically take the username, password from the input form and check it
app.post("/login", passport.authenticate("local",{
    successRedirect:"/secret",
    failureRedirect:"/login"
}), function(req,res){

});

app.get("/logout",function(req, res){
    // passpoar destroy all the user data in the session
    req.logout();
    res.redirect("/");
})

app.listen(process.env.PORT, function(){
    console.log("Server has started!!!")
}); //Cloud 9 enviroment variables