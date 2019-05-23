var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});

var comment_Schema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

var Comment = mongoose.model("Comment", comment_Schema);
module.exports = Comment;
