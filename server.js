// Dependencies
const fs = require("fs");
const path = require('path');
const express = require('express');
const uniqid = require('uniqid');
const app = express();
const PORT = process.env.PORT || 3001;
const data = require('./db/db.json');
const { NOTFOUND } = require("dns");

// parse incoming string or array data(middleware)
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data(middleware)
app.use(express.json());
// file path to public folder(middleware)
app.use(express.static('public'));

// GET and POST Routes

// Route for notes HTML
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Route for db.json file
app.get('/api/notes', (req, res) => {
  return res.json(data);
});

// Post route to save new note and add to db
app.post('/api/notes', (req, res) => {
  req.body.id = uniqid();
  const newNote = req.body;
  console.log(newNote);
  // READ
  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))
  console.log(notes);
  notes.push(newNote);
  // WRITE
  fs.writeFileSync('./db/db.json', JSON.stringify(notes, null, 2))
  res.json(notes);
})

// Delete note 
app.delete('/api/notes/:id', (req, res) => {
  const noteId = (req.params.id).toString();
  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))
  console.log(notes);
  const removeId = notes.filter(notes => notes.id !== noteId);
  fs.writeFileSync('./db/db.json', JSON.stringify(removeId, null, 2))
  res.json(notes);

})

// Returns index HTMl file 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});


// Listener
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
