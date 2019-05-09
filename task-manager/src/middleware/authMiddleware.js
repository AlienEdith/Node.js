// route middleware: new request ---> do middleware --> run route handler
// global middleware, run before every request
// next: for middleware, means this middleware is done, can move on to next thing
// if don't want to move on next, send a response back 
// app.use((req, res, next) => {

    // if(req.method === "GET"){
    //     next()
    // } else {
    //     res.send("request not able")
    // }
    
// })

// can register multiple middleware, order important!
// app.use((req, res, next) => {
//     res.status(503).send("maintainance")
// })
// tokens send in inside Headers:
// Authorization - Bearer token
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // find an user with token id and the token is still in the token array (not expired)
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        if(!user){
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({error: "Please authenticate"})
    }
}

module.exports = auth;