// Dependencies
const fs = require("fs");
const path = require('path');
const express = require('express');
const uniqid = require('uniqid');
const app = express();
const PORT = process.env.PORT || 3001;

// parse incoming string or array data(middleware)
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data(middleware)
app.use(express.json());
// file path to public folder(middleware)
app.use(express.static('public'));

// GET,POST, and DELETE Routes

// Route to display notes HTML
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Route to display notes array in db.JSON
app.get('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))
  return res.json(notes);
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
  // read current notes
  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))
  console.log(notes);
  // remove notes based on ID
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
