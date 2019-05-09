//
// Goal: Create method to get incomplete tasks
//
// 1. Define getTasksToDo method
// 2. Use filter to to return just the incompleted tasks (arrow function)
// 3. Test your work by running the script

const tasks = {
    tasks: [{
        text: 'Grocery shopping',
        completed: true
    },{
        text: 'Clean yard',
        completed: false
    }, {
        text: 'Film course',
        completed: false
    }],
    // ES6 definite function: function inside an object
    // Arrow function is bad for methods!!!!
    getTasksToDo(){
        return this.tasks.filter(task => !task.completed)
    }
}

console.log(tasks.getTasksToDo())