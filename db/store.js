// Define Store requirements
const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Define Store class and methods
class Store {
  // Read note file
  read() {
    return readFileAsync('db/db.json', 'utf8');
  }

  // Write note file
  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }

  // Get notes unpack array if possible
  getNotes() {
    return this.read().then((notes) => {
      let packedNotes;

      try {
        packedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        packedNotes = [];
      }

      return packedNotes;
    });
  }

  // Add a new note or throw error for blank fields
  // Then return new notes with unique ids
  addNote(note) {
    const { title, text } = note;
    const newNote = { title, text, id: uuidv1() };

    if (!title || !text) {
      throw new Error("Cannot be blank.");
    }

    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((newNotes) => this.write(newNotes))
      .then(() => newNote);
  }

  // Remove unwanted notes
  removeNote(id) {
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((cleanedNotes) => this.write(cleanedNotes));
  }
}

module.exports = new Store();
