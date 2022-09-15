const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PhotoSchema = Schema({
    title: String,
    description: String,
    file: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
});

Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;