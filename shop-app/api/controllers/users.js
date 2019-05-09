const mongoose  =   require("mongoose");
const User   =   require("../models/user");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.users_register = (req, res, next)=> {
    User.find({email: req.body.email})
        .exec()
        .then(foundUser => {
            console.log(foundUser);
            if(foundUser.length < 1){
                bcrypt.hash(req.body.password, 10, (err, hash)=>{
                    if(err){
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            email: req.body.email,
                            password: hash
                        })
                        user.save()
                            .then(user => {
                                res.status(201).json({
                                    message: "User Created"
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            });
                    }
                })
            } else {
                res.status(409).json({
                    message: "This email has been used up"
                })
            }
        })
        .catch()
}

exports.users_login = (req, res, next)=>{
    User.find({ email: req.body.email })
        .exec()
        .then(users =>{             //Array
            if(users.length < 1){
                return res.status(401).json({
                    message: "Auth failed"
                })
            }
            bcrypt.compare(req.body.password, users[0].password, function(err, result){
                if(result){
                    const token = jwt.sign({
                                        email: users[0].email,
                                        userId: users[0]._id
                                        }, process.env.JWT_KEY, {
                                        expiresIn: "1h",
                                        });

                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    })                      
                } else {
                    return res.status(401).json({
                        message: "Auth failed"
                    })  
                }
            })
        })
        .catch(err => {
            return res.status(401).json({
                message: "Auth failed",
            })   
        })
}
``
exports.users_delete = (req, res, next) => {
    User.remove({ _id: req.params.userId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User Deleted"
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })            
        })
}