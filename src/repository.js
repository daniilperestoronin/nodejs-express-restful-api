const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/';
const dbName = 'note';
const dbCollection = 'notes';

const noteRepository = {};

// create
noteRepository.createNote = function (note) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db(dbName);
        dbo.collection(dbCollection).insertOne(note, function (err, res) {
            if (err) throw err;
            console.log('note inserted: ' + note);
            db.close();
        });
    });
};

// read all
noteRepository.readAllNotes = function () {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db(dbName);
        let res;
        dbo.collection(dbCollection).find({}).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            res = result;
        });
        return res;
    });
};

//read by id
noteRepository.readNote = function (id) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db(dbName);
        dbo.collection(dbCollection).find({id: id}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
};

// update
noteRepository.updateNote = function (note) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db(dbName);
        dbo.collection(dbCollection).updateOne({id: note.id}, {$set: note}, function (err, res) {
            if (err) throw err;
            console.log('1 document updated');
            db.close();
        });
    });
}

// delete
noteRepository.deleteNote = function (id) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db(dbName);
        dbo.collection(dbCollection).deleteOne({id: id}, function (err, obj) {
            if (err) throw err;
            console.log('1 document deleted');
            db.close();
        });
    });
};

module.exports = noteRepository;