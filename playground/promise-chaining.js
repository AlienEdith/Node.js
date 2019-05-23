require('../task-manager/src/db/mongoose')

const User = require('../task-manager/src/models/user')

// 5cc2356a22ef0f5970e47e27
// User.findByIdAndUpdate('5cc2356a22ef0f5970e47e27', {
//     age: 22
// }).then(user => {
//     console.log(user)
//     return User.countDocuments({ age:22 })
// }).then(result=>{
//     console.log(result)
// })

// with async / await
const updateAgeAndCount = async (id, age) => {
    await User.findByIdAndUpdate(id, {age})
    const res = await User.countDocuments({ age:age })
    return res
}

updateAgeAndCount('5cc2356a22ef0f5970e47e27', 22).then( result => {
    console.log(result)
}).catch(error => {
    console.log(error)
})