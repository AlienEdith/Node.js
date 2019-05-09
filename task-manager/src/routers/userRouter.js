const express = require('express'); 
const router = new express.Router(
    {mergeParams: true}
);

const User = require('../models/user')
const auth = require('../middleware/authMiddleware')

const { sendWelcomeEmail, sendCancelingEmail} = require('../emails/account')

// User can only manipulate their own profile

// USER CREATION: register
router.post('', async (req, res) => {
    const user = new User(req.body)
    try{
        await user.save()
        
        const token = await user.generateAuthToken()
        sendWelcomeEmail(user.email, user.name)
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send({error: e})
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        // res.send({user: user.getPublicProfile(), token})
        res.send({user, token})
    } catch (error) {
        // res.send({error: "User not found or Password not correct!"})
        res.status(400).send({error: error})
    }
})
// logout only current session
router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})
// logout all sessions
router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})
// USER LISTS
//set middleware to individual routes
// router.get('', auth, async (req, res) => {
//     try {
//         const users = await User.find()
//         res.send(users)
//     } catch (e) {
//         res.status(500).send(error.message)
//     }
// })

// FET SIGNED IN USER PROFILE 
router.get('/me', auth, async (req, res) => {
    // req.user is set up by auth middleware
    res.send(req.user)
})

// ONE USER 
// router.get('/:id',auth, async (req, res) => {
//     const _id = req.params.id
//     try {
//         const user = await User.findById(_id)
//         if(!user){
//             return res.status(404).send({})
//         }
//         res.send(user)
//     } catch (e){
//         res.status(500).send(e.message)
//     }
// })

// UPDATE USER
router.patch("/me", auth, async (req, res) => {
    // if the req.body contains property that doesn't exist, mongoDB will simply ignore it
    const updates = Object.keys(req.body)   //array of keys
    const allowedUpdates = ['name', 'password', 'email', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: "Invalid Updates"})
    }

    try {
        // normal way, support middleware
        // const user = await User.findById(req.user._id)
                        // string
        updates.forEach(update => {
            req.user[update] = req.body[update]
        })
        const user = await req.user.save()

        // findByIdAndUpdate will bypass mongoose/middleware, directyly manipulate on the data
        // const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{
        //     new: true, //return updated version
        //     runValidators: true    //validate when update
        // })

        res.send({user, token: user.tokens[0].token})
    } catch (e) {
        res.status(400).send({error: e})
        // res.send({error: "Username or Email have been taken! Password must be at least 7 letters!"})

    }
})

// DELETE USER
router.delete('/me',auth, async (req, res) => {
    try{
        // const deletedUser = await User.findByIdAndDelete(req.user._id)
        // if(!deletedUser) return res.status(404).send({error: "No user"})
        await req.user.remove()
        sendCancelingEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch(e){
        res.status(500).send(e)
    }
})

// UPLOAD USER AVATAR
// multer package: upload files as BINARY files
const multer = require('multer')
const upload = multer({
    // local folder that stored the uploaded files. By default, under the root directory
    // dest: 'avatars',
    limits: {
        fileSize: 100000000
    },
    // only upload specific type of data, a function
    fileFilter(req, file, cb){
        // The function should call `cb` with a boolean
        // to indicate if the file should be accepted
        // file's filename
        // if(!file.originalname.endsWith(".pdf")){}
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('FILE MUST BE word document'))
        }
        cb(undefined, true)
    }
})

const sharp = require('sharp'); // image processing

// multer middleware: file name <---> key
router.post('/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    // file stored in req.file
    try {
        const buffer = await sharp(req.file.buffer).resize({
        width: 250, height: 250
        }).png().toBuffer();

        req.user.avatar = buffer
        // req.user.avatar = req.file.buffer
        await req.user.save()
        res.send({user: req.user, token: user.tokens[0].token})
    } catch (e) {
        
    }
}, (error, req, res, next) => {
    // middleware error handling (if middleware throws an error)
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    console.log("here")
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

// serve up a URL for avatar file: localhost:3000/user/:id/avatar
router.get('/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        //set response header, if no ,by default application/json
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    } catch (error) {
        res.status(404).send()
    }
})

module.exports = router

