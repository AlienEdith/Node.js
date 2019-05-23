const mongoose      =   require("mongoose");
mongoose.connect("mongodb+srv://wyx:"+ process.env.MONGO_ATLAS_PW +"@personal-fxnjy.mongodb.net/restful_api_shop?retryWrites=true", { useNewUrlParser: true });

var orderSchema = new mongoose.Schema({
    product: {    
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model("Order", orderSchema);