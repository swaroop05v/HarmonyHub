const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  url: String,
  duration: String
});

module.exports = mongoose.model('Song', songSchema);
