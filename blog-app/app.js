var express = require("express");
const request = require('request');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var app = express();

mongoose.connect("mongodb://localhost:27017/blog");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(expressSanitizer());

var blogSchema = new mongoose.Schema({
   title: String, 
   image: String, 
   body: String,
   created: {type: Date, default: Date.now()}
});

var Blog = mongoose.model("Blog", blogSchema);

app.get("/", function(req, res){
   res.redirect("/blogs");
});

// INDEX
app.get("/blogs", function(req, res){
   var blogs = Blog.find({}, function(err, blogs){
       if(err)  console.log(err);
       else{
            res.render("index", {blogs: blogs});
       }
   })
});
// NEW
app.get("/blogs/new", function(req, res){
    res.render("new");
});
// CREATE
app.post("/blogs", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    var newPost = req.body.blog;
    Blog.create(newPost, function(err, blog){
        if(err) console.log(err);
        else{
            res.redirect("/blogs");
        }
    });
});
// SHOW
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, blog){
        if(err) console.log(err);
        else{
            res.render("show", {blog: blog}); 
        }
    });
});
// EDIT
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, blog){
        if(err) res.redirect("/blogs");
        else{
            res.render("edit", {blog: blog}); 
        }
    });
});
// UPDATE
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, blog){
        if(err) res.redirect("/blogs");
        else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
});
// DELETE
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err, blog){
       if(err)  console.log(err);
       else{
           res.redirect("/blogs");
       }
    });
});



app.listen(process.env.PORT, function(){
    console.log("Server has started!!!")
}); //Cloud 9 enviroment variables