var jwt = require('jsonwebtoken');

function auth_check(req, res, next){
    try{
        // If failed, error
        // Token don't submit with body, should be with header
        // Key: Authorization value: "Bearer token"
        const token = req.headers.authorization.split(" ")[1];  //remove Bearer
        console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userData = decoded;
        next();
    } catch(error) {
        return res.status(401).json({
            message: "Auth failed"
        });
    }
}

module.exports = auth_check;
