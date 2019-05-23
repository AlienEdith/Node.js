// Shorthand: omit function(), and { return ... }

// const square = (x) => {
//     return x * x
// }

const square = (x) => x * x

// Another shorthand + binding
// const event = {
//     name: 'comeback',
//     memberList: ['Momo', 'Sana', 'Mina'],
//     printTitle: function(){
//         console.log(this.name)
//         this.memberList.forEach(function(member) {
//             console.log("Member: " + member)
//         })
//     }
// }

// arrow functions don't bind their own this value 
// they access the this value in the context in which they're
// created
const event = {
    name: 'comeback',
    memberList: ['Momo', 'Sana', 'Mina'],
    // ES6
    printTitle(){
        console.log(this.name)
        this.memberList.forEach( member => {
            console.log(member + " in "+ this.name)
        })
    }
}

event.printTitle();