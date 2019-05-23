// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

// can be generated in client-side, not by mongoDB
// const id = new ObjectID();
// console.log(id)
// console.log(id.id.length)
// console.log(id.toHexString().length)
// // shrink the size by half from string id
// console.log(id.getTimestamp())


const connectionURL = "mongodb://127.0.0.1:27017" 
const databaseName = "task-manager"

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    // connection callback function run when successfully connected
    if (error)  {
        console.log("Unable to connect to database")
        return;
    }
    // create or connect to dabase
    const db = client.db(databaseName);

    // collection: create or connect to
    const userCollection = db.collection('users');
    const taskCollection = db.collection('tasks')
    
    // Create: insert
    // userCollection.insertOne({
    //     _id: id, name: 'Edith', age: 23
    // }, (error, result) => {
    //     if(error)   return console.log("Unable to insert user")
    //     console.log(result.ops)
    //     // ops: array of documents inserted
    // })

    // userCollection.insertMany([
    //     {
    //         name: "Sana", age:22
    //     },
    //     {
    //         name: "Momo", age:22
    //     }
    // ], (error, result) => {
    //     if(error)   return console.log(error)
    //     console.log(result.ops)
    // })


    // taskCollection.insertMany([
    //     {
    //         description: "workout",
    //         completed: false
    //     },{
    //         description: "respond emails",
    //         completed: false
    //     },{
    //         description: "house cleaning",
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if(error)   return console.log(error)
    //     console.log(result.ops)
    // })

    // Read: find
    // query: an matching object, if no query, return all ( find() )
    // userCollection.findOne({
    //     name: 'Sana', age: 1
    // }, (error, user) => {
    //     if(error) return console.log(error)
    //     //result one object from database, if no, return null
    //     console.log(user) 
    // })

    // userCollection.findOne({
    //     _id: new ObjectID("5cc1f7ade7a69a0630d9b4a8")
    // }, (error, user) => {
    //     if(error) return console.log(error)
    //     //result one object from database, if no, return null
    //     console.log(user) 
    // })

    // find: no callback, return a query curson
    // userCollection.find({age: 22}).toArray((error, users) => {
    //     if(error) return console.log(error)
    //     console.log(users)
    // })

    // userCollection.find({age: 22}).count((error, count) => {
    //     if(error) return console.log(error)
    //     console.log(count)
    // })

    // taskCollection.findOne({_id: new ObjectID("5cc1fa56e13db52e58456a54")}, (error, task) => {
    //     if(error)   return console.log(error)
    //     console.log(task._id)
    // })
    // taskCollection.find({completed: false}).toArray((error, tasks) => {
    //     if(error)   return console.log(error)
    //     console.log(tasks)
    // })

    //update
    // const updatePromise = userCollection.updateOne({
    //     _id: new ObjectID("5cc1f66af0b4634e046bdda5")
    // }, {
    //     //update operations(https://docs.mongodb.com/manual/reference/operator/update/)
    //     // $set:{
    //     //     name: "Nayeon"
    //     // }
    //     $inc: {
    //         age: 1
    //     }
    // })

    // // can also be chained up
    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // taskCollection.updateMany({
    //     completed: false
    // },{
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log("successfully updated")
    // }).catch((error)=>{
    //     console.log("failed")
    // })

    //delete
    // userCollection.deleteOne({
    //     name: "Edith"
    // }).then((result)=>{
    //     console.log(result)
    // }).catch(error => {
    //     console.log(error)
    // })

    taskCollection.deleteMany({
        completed: true
    }).then(result=>{
        console.log(result.deletedCount)
    }).catch(error=>{
        console.log(error)
    })
    console.log("connected")


})

//promise: aysnchronous


