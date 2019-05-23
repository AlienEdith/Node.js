var mongoose = require("mongoose")
var passport_local_mongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

 //ADD methods from PLM package to our schema
userSchema.plugin(passport_local_mongoose)

module.exports = mongoose.model("User", userSchema);