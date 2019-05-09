const express = require('express'); 

const router = new express.Router(
    {mergeParams: true}
);

const _ = require('lodash')

const Task = require('../models/task')
const auth = require('../middleware/authMiddleware')


// TASK CREATION
router.post('', auth, (req, res) => {
    // const task = new Task(req.body)
    // ES6 Syntax: copy all properties in req.body, and add a new property
    const task = new Task({
        ...req.body,
        user: req.user._id
    })
    task.save().then((result)=>{
        res.status(201) 
        res.send(result)
    }).catch(error=>{
        res.status(400).send({
            Error: error.message 
        })
    })
})

// TASK LIST ?completed=true/false?page
// Pagination: limit=2, # of result we want to get
//                 &skip=0, # of the result that skipped from first one(didn't get)
// ?sortBy=createdAt:desc/asc
router.get('', auth, async (req, res) => {
    
    // const queries = Object.keys(req.query)
    // const validQueries = ['completed']
    // const isValidQueries = queries.every((query) => validQueries.includes(query))

    // if(!isValidQueries) return res.status(400).send({error: "Invalid Updates"})

    const match = {}
    if(req.query.completed){
        match.completed = req.query.completed === "true"
    } else {
        _.omit(match, 'completed')
    }

    // pagination                    // custom default value
    const limit = parseInt(req.query.per_page) || 300
    const page = parseInt(req.query.page) || 1
    const skip = (page - 1) * limit 

    // sorting (no custom default value)
    var sort = {}
    if(req.query.sortBy){
        switch(req.query.sortBy.split(":")[0]){
            case "time": 
                _.omit(sort, 'createdAt')
            case "createdAt":
                _.omit(sort, 'time')
        }
        sort[req.query.sortBy.split(":")[0]] = (req.query.sortBy.split(":")[1] === "desc"? -1:1)
    } else {
        sort = {time: 1}
    }

    try {
        await req.user.populate('tasks').execPopulate()
        await req.user.populate({
            path: "tasks",  // which field to populate on
            // match: req.query,   // filter!
            match,          
            options: {  //Pagination
                limit,
                skip,
                sort
            },
        }).execPopulate()

        res.status(200).send(req.user.tasks)
    } catch (error) {
        res.status(500).send(error)
    }
    
    // Task.find({user: req.user._id}).then(result=>{
    //     res.status(200).send(result)
    // }).catch(error=>{
    //     res.status(500).send(error)
    // })
})

router.get('/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({_id, user: req.user._id})
        if(!task){
            return res.status(404).send({})
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
    // Task.findById(_id).then(task=>{
    //     if(!task){
    //         return res.status(404).send({})
    //     }
    //     res.status(200).send(task)
    // }).catch(error=>{
    //     res.status(500).send(error)
    // })

})

// UPDATE TASK
router.patch("/:id", auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const validUpdates = ['description', 'completed', 'time']
    const isValidOperation = updates.every((update) => validUpdates.includes(update))

    if(!isValidOperation) return res.status(400).send({error: "Invalid Updates"})

    try{
        const updatedTask = await Task.findOne({
            _id: req.params.id,
            user: req.user._id
        })

        if(!updatedTask){
            return res.status(400).send({})
        }

        updates.forEach(update => {
            updatedTask[update] = req.body[update]
        })

        await updatedTask.save()

        // const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true
        // })

        res.send(updatedTask)
    } catch (e) {
        res.status(400).send(e)
    }
})

// DELETE TASK
router.delete('/:id', auth, async (req, res) => {
    try{
        const deletedTask = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        })

        // const deletedTask = await Task.findOne({
        //     _id: req.params.id,
        //     user: req.user._id
        // })

        // await deletedTask.remove()

        if(!deletedTask) return res.status(404).send({error: "No task"})
        res.send(deletedTask)
    } catch(e){
        res.status(404).send(e)
    }
})

module.exports = router