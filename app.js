const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const Photo = require('./Models/Photo');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const fs = require('fs');

const app = express();
const port = 3001;

mongoose.connect('mongodb://localhost:27017/pshow');

// Middelwares
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  const photos = await Photo.find().sort('-createdDate');
  res.render('index', { photos });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.get('/photos/:id', async (req, res) => {
  // console.log(req.paramas.id);
  const photo = await Photo.findById({ _id: req.params.id });
  res.render('photos', { photo });
});

app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', { photo });
});

app.put('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`/photos/${req.params.id}`);
});

app.post('/photos', async (req, res) => {
  const uploadDir = 'public/uploads';
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
  const uploadedPhoto = req.files.photo;
  const uploadPath = __dirname + '/public/uploads/' + uploadedPhoto.name;

  uploadedPhoto.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedPhoto.name,
    });
    res.redirect('/');
  });
});

app.listen(port, () => console.log(`Sunucu ${port} nolu porttan başlatıldı.`));
