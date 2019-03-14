const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/';
const dbName = 'note';
const dbCollection = 'notes';

const client = new MongoClient(url);

const noteRepository = {};

// create
noteRepository.createNote = function (note) {
    client.connect(function (err, clientConnect) {
        if (err) throw err;
        const db = clientConnect.db(dbName);
        db.collection(dbCollection).insertOne(note, function (err, res) {
            if (err) throw err;
            console.log('note inserted: ' + JSON.stringify(note));
        });
        clientConnect.close();
    });
};

// read all
noteRepository.readAllNotes = function () {
    let res;
    client.connect(function (err, clientConnect) {
        if (err) throw err;
        const db = clientConnect.db(dbName);
        db.collection(dbCollection).find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res = result;
        });
        clientConnect.close();
    }).finally(
        client.close
    );
    return res;
};

//read by id
noteRepository.readNote = function (id) {
    let res;
    client.connect(function (err, clientConnect) {
        if (err) throw err;
        const db = clientConnect.db(dbName);
        db.collection(dbCollection).find({_id: id}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res = result;
        });
        clientConnect.close();
    });
    return res;
};

// update
noteRepository.updateNote = function (note) {
    client.connect(function (err, clientConnect) {
        if (err) throw err;
        const db = clientConnect.db(dbName);
        db.collection(dbCollection).updateOne({_id: note._id}, {$set: note}, function (err, result) {
            if (err) throw err;
            console.log('document with _id: ' + note._id + 'updated');
        });
        clientConnect.close();
    });
};

// delete
noteRepository.deleteNote = function (id) {
    client.connect(function (err, clientConnect) {
        if (err) throw err;
        const db = clientConnect.db(dbName);
        db.collection(dbCollection).deleteOne({id: id}, function (err, result) {
            if (err) throw err;
            console.log('document with _id: ' + note._id + ' deleted');
        });
        clientConnect.close();
    });
};

module.exports = noteRepository;