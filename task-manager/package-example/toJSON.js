const dog = {
    name: "Rui",
    age: 1
}

console.log(JSON.stringify(dog))

dog.toJSON = function()  {
    return this.name
}

console.log(JSON.stringify(dog))