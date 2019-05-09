// An array of Object: id, username, room
// id: unique id for each socket connection
const users = []

const addUser = ({id, username, room}) => {
    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Validate
    if(!username || !room){
        return {
            error: "Username and room are required!"
        }
    }

    // Check uniqueness
    const existingUser = users.find(user => {
        return user.username === username && user.room === room
    })

    if(existingUser){
        return {
            error: "Username is in use in this room!"
        }
    }

    // store user
    const user = { id, username, room }
    users.push(user)

    return {user: user}
}

const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id)
    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    const user = users.find(user => user.id === id)
    return user
}

const getUserInroom = (room) => {
    room = room.trim().toLowerCase()
    const user = users.filter(user => user.room === room)
    return user
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUserInroom
}