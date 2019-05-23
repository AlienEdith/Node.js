
const bcrypt = require('bcryptjs')

const myFunction = async () => {
    const password = 'red12345'
    // hash algorithm: one-way, cannot reverse!
                        // return a promise  # of rounds hashed
    const hashedPassword = await bcrypt.hash(password, 8)
    console.log(hashedPassword)

    // login: hash the input password, compare to the database stored hased password
    const isMatch = await bcrypt.compare('red12345', hashedPassword)
    console.log(isMatch)
}
myFunction()