const mongoose = require('mongoose');
const {
  Schema,
  Types: { ObjectId }
} = mongoose;
const LinkSchema = require('./Link').schema;

const PlaylistSchema = new Schema({
  _user: {
    type: ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'First name is required']
  },
  links: {
    type: [LinkSchema]
  },
  privacy: {
    type: String,
    enum: ['public', 'private'],
    default: 'private'
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

// UserSchema.static('findByEmail', async function (email) {
//   return await this.findOne({ email });
// });

// UserSchema.pre('save', function (next) {
//   this.updated = Date.now();
//   return next;
// });

// UserSchema.method('verifyPassword', function (password) {
//   return new Promise(async resolve => {
//     const passwordIsCorrect = await bcrypt.compare(password, this.password);
//     resolve(passwordIsCorrect);
//   });
// });

module.exports = mongoose.model('Playlist', PlaylistSchema);
