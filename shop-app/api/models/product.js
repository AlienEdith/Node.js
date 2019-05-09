const mongoose      =   require("mongoose");
mongoose.connect("mongodb+srv://wyx:"+ process.env.MONGO_ATLAS_PW +"@personal-fxnjy.mongodb.net/restful_api_shop?retryWrites=true", { useNewUrlParser: true });

var productSchema = new mongoose.Schema({
    name: String,
    price: {
        type: Number,
        required: true
    },
    productImage: {
        type: String
    }
});

module.exports = mongoose.model("Product", productSchema);