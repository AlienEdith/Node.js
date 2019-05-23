var express = require("express");
var router = express.Router({mergeParams: true});
var request = require('request');

var Campground = require("../models/campground");
var middleware = require("../middleware") //automatically load index.js when require a directory

// FIND helper method
const find = (query, page, search, res) => {
    Campground.countDocuments(query, (error, count)=>{
        Campground.find(query, null, 
            {
                limit: 6,
                skip: (page - 1) * 6
            },
            function(err, campgrounds){
                if(err) console.log(err);
                else{
                    res.render("./campgrounds/index", {campGrounds: campgrounds, currentPage: page, pages: Math.ceil(count / 6), search});
                } 
        });
    })
}

// INDEX
router.get('/', (req, res) => {
    var query = {}
    var page = 1
    if(req.query.search){
        query['name'] = new RegExp(req.query.search, 'gi');
    }
    if(req.query.page){
        page = req.query.page
    }
    find(query, page, req.query.search, res)
});

// NEW
router.get('/new',middleware.isLoggedIn, (req, res) => {
    res.render("./campgrounds/new");
});
// CREATE
router.post("/",middleware.isLoggedIn, (req, res) => {
    var name = req.body.name;
    var img = req.body.img;
    var desc = req.body.desc;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.name}&key=${process.env.GOOGLE_MAP_KEY}`
    request({url, json: true}, (error, response) => {
            if(!error){
                try {
                    const coords = response.body.results[0].geometry.location
                    var campGround = { name: name, img: img, desc: desc, author: author, price: price, coords: coords };
                    Campground.create(campGround, function(err, campground){
                        if(err) console.log(err);
                        else{
                            res.redirect("/campgrounds");
                        }
                    });
                } catch (error) {
                    req.flash("error", "Your input might not be a campground, please check again!");
                    return res.redirect("/campgrounds");
                }
            }
        }
    )
});

// SHOW
router.get("/:id", (req, res) => {
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err, campground){
        if(err || !campground) {
            req.flash("error", "Campground not found");
            return res.redirect("/campgrounds");
        }
        res.render("./campgrounds/show", {campground: campground, currentUser: req.user});
    });
});

// EDIT
router.get("/:id/edit", middleware.isCampgroundAuthor, (req, res) => {
    Campground.findById(req.params.id, function(err, campground){
        if(err || !campground){
            req.flash("error", "Campground not found");
        }
        else {
            res.render("./campgrounds/edit", {campground: campground});
        }
    });
});
// UPDATE
router.put("/:id", middleware.isCampgroundAuthor, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err || !campground) {
            res.redirect("/campgrounds")
        }
        else{
            req.flash("success", "You have successfully updated it!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DELETE
router.delete("/:id", middleware.isCampgroundAuthor, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err, campground){
        if(err || !campground) res.redirect("/campgrounds/"+req.params.id);
        else{
            req.flash("success", "You have successfully deleted it!");
            res.redirect("/campgrounds");
        }
    });
});




module.exports = router;