const express = require('express');
const path = require('path');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
    res.render('index');
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


app.listen(port, () => console.log(`Sunucu ${port} nolu porttan başlatıldı.`));
