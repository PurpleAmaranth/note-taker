module.exports = (app) => {
    const router = require('express').Router();
    const store = require('../db/store');

    //GET
    app.get('/notes', (req, res) => {
        store
            .getNotes()
            .then((notes) => {
                return res.json(notes);
            })
            .catch((err) => res.status(500).json(err));
    });

    //POST
    app.post('/notes', (req, res) => {
        store
            .addNote(req.body)
            .then((note) => res.json(note))
            .catch((err) => res.status(500).json(err))
    });

    //DELETE
    app.delete('/notes/:id', (req, res) => {
        store
            .removeNote(req.params.id)
            .then(() => res.json({ ok: true }))
            .catch((err) => res.status(500).json(err));
    });
}