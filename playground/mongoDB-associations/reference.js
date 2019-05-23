var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/reference", {useNewUrlParser: true});

// Reference: Storing ID, not the actual whole data

// POST - title, content
var Post = require("./models/post");

// USER - email, name
var User = require("./models/user");

// User.create({
//     email: "yixing@gmail.com",
//     name: "Yixing"
// });

// Post.create({
//   title: "Title",
//   content: "Content"
// }, function(err, post){
//     if(err) console.log(err);
//     else{
//         User.findOne({name: "Yixing"}, function(err, user){
//         if(err) console.log(err)
//         else{
//             user.posts.push(post);
//             user.save(function(err,data){
//                 if(err) console.log(err);
//             });
//         }
//         });
//     }
// });

User.findOne({name: "Yixing"}).populate("posts").exec(function(err,user){
    if(err) console.log(err);
    else{
        console.log(user);
    }
});



