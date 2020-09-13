const mongoose = require('mongoose');
const { Schema } = mongoose;

const LinkSchema = new Schema({
  url: {
    type: String,
    trim: true,
    required: [true, 'Link URL required']
  },
  title: {
    type: String,
    trim: true,
    required: [true, 'Link title required']
  },
  thumbnail: {
    type: String,
    trim: true,
    required: [true, 'Thumbnail required']
  }
});

module.exports = mongoose.model('Link', LinkSchema);
