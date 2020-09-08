const express = require('express');
const router = express.Router();

const Playlist = require('../models/Playlist');

router.post('/', async (req, res) => {});

router.get('/my', async (req, res) => {
  const playlists = await Playlist.find({ _user: req.user._id }, null)
    .sort({ updatedAt: -1 })
    .lean();
  return res.render('main', {
    page: 'playlists',
    path: '/playlists/my',
    styles: ['playlists'],
    scripts: ['playlists'],
    playlists
  });
});

module.exports = router;
