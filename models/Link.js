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
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Link', LinkSchema);
