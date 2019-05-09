const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Validation: commonly used with validator library
const validator = require('validator')

const Task = require('./task')

var userSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String,
        required: true,
        trim: true  // Sanitization: SchemaType string
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0) {
                throw new Error("Age must be positive number")
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        // custom validation with validate function (method with ES6 Syntax)
        // and validator library
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        },
        unique: true
    },
    password: {
        type: String,
        required: true,
        // Built-in Validators
        minlength: 7,
        trim: true,
        validate(value){
            if(validator.contains(value.toLowerCase(), "password")){
                throw new Error("Password can't contain 'password'")
            }
        }
    },
    tokens: [{  // an array
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer    //any binary files (images, .... with Multer package)
    }
}, {
    timestamps: true
})

// Virtual Property: don't store the data, just provide the relationship
// given the user, could get all its tasks (Array) . One => Many 
userSchema.virtual('tasks', {
    ref: "Task",
    localField: '_id',    // field value in the other model
    foreignField: 'user' // field name in the other model
})

// set up a function on the schema with schema.statics to the Model / the whole Collection
// User.findBy... static method
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user){
        throw new Error("Unable to login")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error("Unable to login")
    }
    return user;
}

// instance methods         need this binding
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET) 
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
} 

// userSchema.methods.getPublicProfile = function(){
//     const user = this

//     const userObject = user.toObject()
//     delete userObject.password
//     delete userObject.tokens

//     return userObject
// }

// like toString() method, only return desired data
// JSON.stringfy()
userSchema.methods.toJSON = function(){
    const user = this

    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}


// set Model Middleware: before save/update and save, function will be executed
                    // must be normal function, required binding this keyword
// Pre middleware functions are executed one after another, when each middleware calls next.                    
userSchema.pre('save', async function(next){
    // bcrypt function is promise, use async
    const user = this   // bind this to current user
    // only hash the password if the user want to modify password/first created
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    //when the function is done, call next() => the middleware is finised
    next()
})

// Cascade Delete: delete tasks when user is remove
userSchema.pre('remove', async function(next){
    const user = this
    await Task.deleteMany({user: user._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User;
