const mongoose = require('mongoose');
const moment = require('moment')

const TaskSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User" 
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    time: {
        type: Date,
        default: Date.now()
    }
},{
    timestamps: true
})

TaskSchema.methods.toJSON = function(){
    const data = this
    const dataObject = data.toObject()
    dataObject.time = moment.utc(dataObject.time).format("YYYY-MM-DD")
    return dataObject
}

const Task = mongoose.model('Task', TaskSchema)



module.exports = Task

