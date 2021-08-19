const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync('db/db.json', 'utf8');
  }

  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }

  getNote() {
    return this.read().then((note) => {
      let parseNote;

      try {
        parseNote = [].concat(JSON.parse(note));
      } catch (err) {
        parseNote = [];
      }

      return parseNote;
    });
  }

  addNote(note) {
    const { title, text } = note;
    const newNote = { title, text, id: uuidv1() };

    if (!title || !text) {
      throw new Error("Cannot be blank.");
    }

    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

  removeNote(id) {
    return this.getNote()
      .then((note) => note.filter((note) => note.id !== id))
      .then((noteFilter) => this.write(noteFilter));
  }
}

module.exports = new Store();