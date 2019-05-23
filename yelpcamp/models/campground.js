var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});

var campground_Schema = new mongoose.Schema({
    name: String,
    img: String,
    desc: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
    }],
    price: String,
    coords:{
        type: Object
    }
});

var Campground = mongoose.model("Campground", campground_Schema);
module.exports = Campground;
