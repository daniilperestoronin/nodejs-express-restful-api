const express = require('express');
const app = express();
app.use(express.json());

const notes = [
    {
        id: 1,
        title: 'Title 1',
        date: new Date(2019, 1, 1),
        content: 'Lorem ipsum lacinia curabitur non nibh convallis condimentum'
    },
    {
        id: 2,
        title: 'Title 2',
        date: new Date(2019, 2, 1),
        content: 'Lorem ipsum lacinia curabitur non nibh convallis condimentum'
    },
    {
        id: 2,
        title: 'Title 3',
        date: new Date(2019, 3, 1),
        content: 'Lorem ipsum lacinia curabitur non nibh convallis condimentum'
    },
];

app.post('/note', (req, res, next) => {
    notes.push(req.body);
    res.status(200).json({status: 'Ok'});
});

app.get('/note', (req, res, next) => {
    res.json(notes);
});

app.get('/note/:id', (req, res, next) => {
    res.json(notes
        .find(note => note.id === Number.parseInt(req.params.id)));
});

app.put('/note', (req, res, next) => {
    const removeIndex = notes.map(function (item) {
        return item.id;
    }).indexOf(Number.parseInt(req.body.id));
    notes.splice(removeIndex, 1, req.body);
    res.status(200).json({status: 'Ok'});
});

app.delete('/note/:id', (req, res, next) => {
    const removeIndex = notes.map(function (item) {
        return item.id;
    }).indexOf(Number.parseInt(req.params.id));
    notes.splice(removeIndex, 1);
    res.status(200).json({status: 'Ok'});
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});