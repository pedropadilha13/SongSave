const express = require('express');
const router = express.Router();

const { requireAuth } = require('../middlewares');

const Playlist = require('../models/Playlist');
const User = require('../models/User');

router.get('/me', requireAuth, (req, res) => {
  return res.json(req.user);
});

router.get('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const playlists = await Playlist.find(
    { _user: id, privacy: id !== user._id ? 'public' : null },
    null,
    { limit: 12 }
  )
    .sort({ updatedAt: -1 })
    .lean();

  return res.render('main', {
    page: 'profile',
    title: `${user.firstName} | SongSave`,
    styles: ['profile'],
    user: req.user,
    profile: user,
    playlists
  });
});

router.get('/:id/playlists', async (req, res) => {
  const playlists = await Playlist.find({ _user: req.params.id })
    .sort({ updatedAt: -1 })
    .lean();
  playlists.totalLinks = playlists.links.length;
  delete playlists.links;

  const { name } = await User.findById(req.params.id);

  return res.render('main', {
    page: 'playlists',
    title: `${name} - Coleções | SongSave`,
    styles: ['playlists'],
    scripts: ['playlists'],
    user: req.user,
    playlists
  });
});

module.exports = router;
