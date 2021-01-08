const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// setups
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/leave-note', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'leave-note.html'));
});

app.post('/leave-note', (req, res) => {
  fs.appendFileSync('./notes', req.body.note+'\n');
  res.status(302);
  res.redirect('/');
});

app.get('/read-note', (req,res) => {
  const notes = fs.readFileSync('./notes', {encoding: 'utf8', flag: 'r'}).split('\n');
  res.render('read-note', {notes});
});

// catch-all-middleware
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'views', '404.html'));
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));