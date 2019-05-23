var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/assocaition", {useNewUrlParser: true});

// POST - title, content
var postSchema = new mongoose.Schema({
   title: String,
   content: String
});
var Post = mongoose.model("Post", postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
   email: String,
   name: String,
   posts:[postSchema] // will be a Array
});
var User = mongoose.model("User", userSchema);

var newUser = new User({
    email: "678@gmail.com",
    name: "Edith Wang"
});

newUser.posts.push({
    title: "New",
    content: "New"
});
// newUser.save(function(err, user){
//   if(err){
//       console.log(err);
//   } 
// });
 
// var newPost = new Post({
//     title: "Title",
//     content: "Content"
// });
// newPost.save(function(err, user){
//   if(err){
//       console.log(err);
//   } 
// });