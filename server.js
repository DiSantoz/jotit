// Dependencies
const fs = require("fs");
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// parse incoming string or array data(middleware)
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data(middleware)
app.use(express.json());
// file path to public folder(middleware)
app.use(express.static('public'));

// Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
  
// Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
  