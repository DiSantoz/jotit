// Dependencies
const fs = require("fs");
const path = require('path');
const express = require('express');
const uniqid = require('uniqid');
const app = express();
const PORT = process.env.PORT || 3001;
const data = require('./db/db.json');

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
  data.push(newNote);
  res.json(data);
})

// Returns index HTMl file 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});


// Listener
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
