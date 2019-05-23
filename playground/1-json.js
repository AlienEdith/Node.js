const fs = require('fs')

// const book = {
//     title: 'ABC',
//     author: 'yxwang'
// }

// const bookJSON = JSON.stringify(book)   // object => JSON
// fs.writeFileSync('1-json.json', bookJSON)
// const bookObj = JSON.parse(bookJSON)    //  JSON => object

// const dataBuffer = fs.readFileSync('1-json.json')
// console.log(dataBuffer.toString())
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON)
// console.log(data.title)

const dataBuffer = fs.readFileSync('data.json')
const data = JSON.parse(dataBuffer.toString())
data.name = "Yixing"
data.age = 23
data.planet = "Mars"

const dataJSON = JSON.stringify(data)
fs.writeFileSync('data.json', dataJSON)

