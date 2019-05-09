var mongoose                =   require("mongoose");
var express                 =   require("express");
var bodyParser              =   require("body-parser");
var ejs                     =   require("ejs");
var request                 =   require('request');
var passport                =   require("passport");
var passport_local          =   require("passport-local");
var passport_local_mongoose =   require("passport-local-mongoose");
var express_session         =   require("express-session");
var method_override         =   require("method-override");
var express_sanitizer       =   require("express-sanitizer");
var connect_flash           =   require("connect-flash");

var User = require("./models/user");

var commentsRoutes = require("./routes/comments");
var campgroundsRoutes = require("./routes/campground");
var authRoutes = require("./routes/auth");

mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true });

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(method_override("_method"));
app.use(express_sanitizer());
app.use(express.static(__dirname+"/public"));
app.use(connect_flash());
// Passport Set Up: Order
app.use(express_session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passport_local(User.authenticate()));
passport.serializeUser(User.serializeUser());     
passport.deserializeUser(User.deserializeUser()); 

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/campgrounds/:id/comments", commentsRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use(authRoutes);


app.get('/', (req, res) => {
    res.render("landing.ejs");
});


app.listen(process.env.PORT, process.env.IP, () => {
    console.log("Server has started!!!")
}); 