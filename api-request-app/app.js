var express = require("express");
var app = express();
const request = require('request');
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get('/', function(req, res){
    res.render("home");
});

app.get("/results", function(req, res){
    var title = req.query.title;
    var url = "http://www.omdbapi.com/?apikey=thewdb&s="+title;
    request(url, function(error, response, body){
        if(!error && response.statusCode==200){
            var parsedData = JSON.parse(body);
            var searchResults = parsedData.Search;
            var totalResults = parsedData.totalResults;
            res.render("results",
                    {   searchResults: searchResults,
                        totalResults: totalResults
                    });
        }
    });
});


app.listen(3000, function(){
    console.log("Server has started!!!")
}); //Cloud 9 enviroment variables