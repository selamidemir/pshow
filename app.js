const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const Photo = require('./Models/Photo');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/pshow');

// Middelwares
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
   const photos = await Photo.find();
   console.log(photos)
  res.render('index', {photos});
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.get('/photos', (req, res) => {
  res.render('photos');
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});

app.listen(port, () => console.log(`Sunucu ${port} nolu porttan başlatıldı.`));
