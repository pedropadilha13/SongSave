const axios = require('axios').default;

const { YOUTUBE_API_KEY } = process.env;

module.exports = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: YOUTUBE_API_KEY
  }
});
