const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Connect DB

mongoose.connect('mongodb://localhost/pcat-test-db');

const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

// Photo.create({
//   title: 'Photo 3 Title',
//   description: 'Photo 3 Decription',
// });

// Photo.find({}, (err, data) => console.log(data));

// const id = '632184ab78df8f39b4a62b4e';
// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: 'Photo New Title',
//     description: 'Photo new description.',
//   },
//   { new: false },
//   (err, data) => console.log(data)
// );

const id = '632184ab78df8f39b4a62b4e';

Photo.findByIdAndDelete(id, (err, data) => console.log('Kayıt silindi.'));