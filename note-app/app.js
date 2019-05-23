const notes = require('./notes')
const validator = require('validator')
const chalk = require('chalk')

const yargs = require('yargs')
yargs.parse()

// create add commands
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true, //whether the arg is required
            type: "string"      //will be read in as string
        },
        body: {
            describe: 'Note Body',
            demandOption: true, 
            type: "string" 
        }
    },
    handler: function(argv){
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: "string"
        }
    },
    //ES6 Methods: Functions Definitions shorthand
    handler(argv){
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'List notes',
    handler(){
        notes.listNotes();
    }
})

yargs.command({
    command: 'read',
    describe: 'read a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})
   


