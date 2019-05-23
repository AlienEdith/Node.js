// Object property shorthand

const name = 'Yixing'
const age = 23

const user = {
    name, age
}


// Object destructing
const twice = {
    members: 9,
    genre: "kpop"
}
        // assign a new name  default value if property not match
const { members: number, genre, rating="5" } = twice
// console.log(number)
// console.log(genre)
// console.log(rating)

// destructing directly from argument
const comeback = (type, {genre} ) => {
    console.log(genre)
}

comeback('mini', twice)