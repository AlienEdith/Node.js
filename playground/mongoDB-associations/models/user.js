var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/reference", {useNewUrlParser: true});
var userSchema = new mongoose.Schema({
   email: String,
   name: String,
   posts:[
       {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ]
});
var User = mongoose.model("User", userSchema);

// Return of this module
module.exports = User;