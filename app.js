const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const photoControllers = require('./controllers/photoControllers')
const pageControllers = require('./controllers/pageControllers')
const app = express();
const port = 3001;

mongoose.connect('mongodb://localhost:27017/pshow');

// Middelwares
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', { methods: ['POST', 'GET']}));

// Pages Routes
app.get('/about', pageControllers.getAboutPage);
app.get('/add', pageControllers.getAddPage);
app.get('/photos/edit/:id', pageControllers.getEditPage);

// Photos Routes
app.get('/photos/:id', photoControllers.getPhoto);
app.get('/', photoControllers.getAllPhotos);
app.post('/photos', photoControllers.createPhoto);
app.put('/photos/:id', photoControllers.updatePhoto);
app.delete('/photos/:id', photoControllers.deletePhoto);

// Server starts to listen port
app.listen(port, () => console.log(`Sunucu ${port} nolu porttan başlatıldı.`));
