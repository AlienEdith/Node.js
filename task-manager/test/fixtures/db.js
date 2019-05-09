const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: "yxwang",
    email: "yxwang@example.com",
    password: "wangyixing",
    tokens: [{
        token: jwt.sign({ _id: userOneId}, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: "sana",
    email: "sana@example.com",
    password: "wangyixing",
    tokens: [{
        token: jwt.sign({ _id: userTwoId}, process.env.JWT_SECRET)
    }]
}

const TaskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: "task-1",
    user: userOne._id
}

const TaskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: "task-2",
    user: userOne._id
}

const TaskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: "task-3",
    user: userTwo._id
}

const setUpDatabase = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(TaskOne).save()
    await new Task(TaskTwo).save()
    await new Task(TaskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    TaskOne,
    TaskTwo,
    TaskThree,
    setUpDatabase,
}