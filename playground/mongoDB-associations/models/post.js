var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/reference", {useNewUrlParser: true});
// POST - title, content
var postSchema = new mongoose.Schema({
   title: String,
   content: String
});
var Post = mongoose.model("Post", postSchema);
// Return of this module
module.exports = Post;