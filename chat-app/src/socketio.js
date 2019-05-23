const http = require('http')

const app = require('./app')
const server = http.createServer(app)

const Filter = require('bad-words')
const { addUser, removeUser, getUser, getUserInroom } = require('./utils/users')
const { generateMessage, generateLocationMessage }= require('./utils/messages')

// socket io is on a pure http server
var io = require('socket.io')(server);


//event acknowledgement: allows the receiver of the event to acknowledge that it received and processed the event know
// emit-side get notified that the event was received and processed
// emit-side --> receive-side --> acknowledgement ---> emit-side

io.on('connection', (socket) => {
    console.log("New WebSocket Connection")

    socket.on('join', ({ username, room }, callback) => {

        const { error, user } = addUser({id: socket.id, username, room})

        if(error){
            return callback(error)
        }
        
        // add client to the room
        socket.join(user.room)

        socket.emit('message', generateMessage("Admin", "Welcome!"))        
        socket.broadcast.to(user.room).emit("message", generateMessage("Admin", `${user.username} has joined!`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUserInroom(user.room)
        })
        callback()
        // io.to().emit(): emit vent to everybody in a specific room
        // socket.broadcast.to().emit()
    })

    // broadcast: every connection, except itself
    // socket.broadcast.emit("message", generateMessage("A new user has joined!"))
    // emit to itself
    // socket.emit('message', generateMessage("Welcome!"))

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        const filter = new Filter()
        if(filter.isProfane(message)){
            return callback('Profanity is not allowed')
        }
        io.to(user.room).emit('message', generateMessage(user.username, message))
        callback()  // acknowledge the event
    })

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id)
        const location = `https://google.com/maps?q=${coords.lat},${coords.lng}`
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, location))
        callback()
    })

    // built-in event when disconnect
    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if(user){
            io.to(user.room).emit('message', generateMessage("Admin", `${user.username} has left`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUserInroom(user.room)
            })
        }
    })

})

module.exports = server;