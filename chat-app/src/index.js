const server = require('./socketio')

server.listen(process.env.PORT, () => {
    console.log("The server is running")
})