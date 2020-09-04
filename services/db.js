const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://songsave:gxgDJWcvHrMmCn65@cluster0.ky6xj.mongodb.net/dev?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
