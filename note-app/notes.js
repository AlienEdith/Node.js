const fs = require('fs')
const _ = require('lodash')
const chalk = require('chalk')

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        // An array of JSON data
        const notesJSON = dataBuffer.toString();
        // An array of Object
        const notes = JSON.parse(notesJSON);
        return notes;
    } catch (e) {
        // if no such file
        return [];
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

const getNotes = () => {
    console.log("Your notes...")
}

const addNote = (title, body) => {

    const notes = loadNotes();  // Array

    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote) {
        const newNote = {
            title: title,
            body: body
        }
        
        notes.push(newNote);
        saveNotes(notes)

        console.log(chalk.green.inverse("New Note Added"))
    } else {
        console.log(chalk.red.inverse("Note Title Taken"))
    }

}

const removeNote = (title) => {
    
    const notes = loadNotes();  

    const notesToKeep = notes.filter(note => note.title !== title)

    if(notesToKeep.length < notes.length){
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse(`${title} has been removed`))
    } else {
        console.log(chalk.red.inverse(`No note with title "${title}" found`))
    }

}

const listNotes = () => {
    
    const notes = loadNotes();  
    
    notes.forEach( note => {
        console.log(chalk.yellow(note.title) +" "+ chalk.blue(note.body))
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);

    if(note){
        console.log(chalk.yellow.bold.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse("No note found!"))
    }
}

module.exports = {
    getNotes,
    addNote,
    removeNote,
    listNotes,
    readNote
};