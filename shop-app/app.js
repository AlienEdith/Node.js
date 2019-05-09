const express       =   require("express");
const morgan        =   require("morgan");
const body_parser   =   require("body-parser");
const mongoose      =   require("mongoose");

const productRoutes =   require("./api/routes/products");
const orderRoutes   =   require("./api/routes/orders");
const userRoutes    =   require("./api/routes/users");
const app = express();

app.use(morgan('dev')); //format: dev
app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());
app.use('/uploads', express.static('uploads'));     //.static(): Make the directory public, accessible
// Password: exports environment variable USUALLY
mongoose.connect("mongodb+srv://wyx:"+ process.env.MONGO_ATLAS_PW +"@personal-fxnjy.mongodb.net/restful_api_shop?retryWrites=true", { useNewUrlParser: true });
mongoose.Promise = global.Promise; //Use nodejs promise

// CORS: Cross-Origin Resource Sharing
// Everyone has access to this api of any methods
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", 
                "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === "OPTIONS"){   //browser always set method to OPTIONS when post/put request
        res.header('Access-Control-Allow-Methods', "PUT, POST, PATCH ,DELETE, GET");
        return res.status(200).json({});
    }
    next();
})

// Routes
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);

// Error Handling - if the url doesn't match any routes
app.use((req, res, next)=>{
    const error = new Error("Not found");
    error.status = 404;
    next(error);                        //pass error to next function(middleware)
});
app.use((err, req, res, next)=>{       // Show the error message
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

module.exports = app;





