var express = require("express");
var app = express();

// Set up the path for static assets
app.use(express.static("public"));
// Set view engine as ejs, omit ".ejs" suffix in file name
app.set("view engine", "ejs");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.send("Hi there, welcome to my Express exercises!");
})

app.get("/speak/:animal", function(req, res){
    var animal = req.params.animal.toLowerCase();
    var sound = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!"
    }
    var sound = sound[animal];

    res.send("The "+animal+" says '"+sound+"'");
})

app.get("/repeat/:content/:num", function(req, res){
    var content = req.params.content;
    var num = Number(req.params.num);
    var str = "";
    for(var i=0; i<num; i++){
        str += content +" ";
    }
    res.send(str.trim());
})


app.get("/fallinlovewith/:member", function(req,res){
    var member = req.params.member;
    res.render("love", {member: member});
});

app.get("/posts", function(req,res){
    var posts = [
        {title: "No Sana No Life", author: "Sana"},
        {title: "Ballemina", author: "Mina"},
        {title: "DancingMochine", author: "Momo"},
        ];
    res.render("motto", {posts: posts});
});

var discography = [
    {title: "The Story Begins", year: "2015"},
    {title: "Page Two", year: "2016"},
    {title: "Signal", year: "2017"},
];

app.get("/discography", function(res, res){
    res.render("discography", {discography : discography}); 
});

app.post("/addDisc", function(req,res){
    var newTitle = req.body.newTitle;
    var newYear = req.body.newYear;
    // console.log(req.body);
    var disc = {title: newTitle, year: newYear};
    discography.push(disc);
    res.redirect("/discography");
});

app.get("*", function(req, res){
    res.send("Sorry, page not found...What are you doing with your life?");
})

app.listen(process.env.PORT, function(){
    console.log("Server has started!!!")
}); //Cloud 9 enviroment variables