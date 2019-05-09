require('../task-manager/src/db/mongoose')

const Task = require('../task-manager/src/models/task')

// Task.findByIdAndDelete("5cc23664dc3e7130a48c5658")
//     .then(result => {
//         console.log(result)
//         return Task.countDocuments({completed: false})
//     }).then(result => {
//         console.log(result)
//     })

const TaskDeleteAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    const result = await Task.countDocuments({completed: false})
    return result
}

TaskDeleteAndCount('5cc23652dc3e7130a48c5657').then(result => {
    console.log(result)
}).catch(error => {
    console.log(error)
})