const mongoose      =   require("mongoose");
mongoose.connect("mongodb+srv://wyx:"+ process.env.MONGO_ATLAS_PW +"@personal-fxnjy.mongodb.net/restful_api_shop?retryWrites=true", { useNewUrlParser: true });

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,    //Nothing related to validation, just optimized for better search, index purpose
        // regular expression: /re/
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true        
    }
});

module.exports = mongoose.model("User", userSchema);