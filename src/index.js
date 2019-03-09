const express = require('express');
const noteRepository = require('./repository');

const app = express();
app.use(express.json());

app.post('/note', (req, res, next) => {
    noteRepository.createNote(req.body);
    res.status(200).json({status: 'Ok'});
});

app.get('/note', (req, res, next) => {
    res.json(noteRepository.readAllNotes());
});

app.get('/note/:id', (req, res, next) => {
    res.json(noteRepository.readNote(req.params.id));
});

app.put('/note', (req, res, next) => {
    noteRepository.updateNote(req.body);
    res.status(200).json({status: 'Ok'});
});

app.delete('/note/:id', (req, res, next) => {
    noteRepository.deleteNote(req.params.id);
    res.status(200).json({status: 'Ok'});
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});