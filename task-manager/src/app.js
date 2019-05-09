const express = require('express')
require('./db/mongoose')

const app = express()

app.use(express.json())

// CORS: Cross-Origin Resource Sharing
// Everyone has access to this api of any methods
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', "PUT, POST, PATCH ,DELETE, GET");
    res.header("Access-Control-Allow-Headers", 
                "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    if(req.method === "OPTIONS"){   //browser always set method to OPTIONS when post/put request
        res.header('Access-Control-Allow-Methods', "PUT, POST, PATCH ,DELETE, GET");
        return res.status(200).json({});
    }
    next();
})

const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')
app.use('/api/users', userRouter)
app.use('/api/tasks', taskRouter)

module.exports = app;