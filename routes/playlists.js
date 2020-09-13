const express = require('express');
const router = express.Router();

const youtube = require('../assets/apis/youtube');

const { requireAuth } = require('../middlewares');

const Playlist = require('../models/Playlist');

const getVideoId = url => {
  url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return undefined !== url[2] ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
};

router.get('/new', requireAuth, (req, res) => {
  return res.render('main', {
    page: 'newPlaylist',
    path: '/playlists/new',
    title: 'Nova Coleção',
    styles: ['newPlaylist'],
    scripts: ['newPlaylist'],
    user: req.user
  });
});

router.get('/my', requireAuth, async (req, res) => {
  const playlists = await Playlist.find({ _user: req.user._id }, '-links')
    .sort({ updatedAt: -1 })
    .lean();

  console.log(playlists);

  return res.render('main', {
    page: 'playlists',
    path: '/playlists/my',
    title: 'Minhas Coleções',
    styles: ['playlists'],
    scripts: ['playlists'],
    user: req.user,
    playlists
  });
});

router.get('/public', async (req, res) => {
  const playlists = await Playlist.find({ privacy: 'public' }, '-links', {
    sort: { updated: -1 },
    limit: 100
  })
    .populate('_user', 'firstName lastName')
    .lean();
  return res.render('main', {
    page: 'playlists',
    path: '/playlists/public',
    title: 'Coleções Públicas',
    styles: ['playlists'],
    scripts: ['playlists'],
    user: req.user,
    playlists
  });
});

router.get('/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).lean();
    if (playlist.privacy === 'public' || playlist._user === req.user._id) {
      return res.render('main', {
        page: 'playlist',
        path: '/playlist',
        title: `${playlist.name} | SongSave`,
        styles: ['playlist'],
        user: req.user,
        playlist
      });
    } else {
      req.session.messages = [
        ...(req.session.messages || []),
        {
          variant: 'danger',
          content:
            'Você não tem permissão para visualizar a Coleção solicitada.'
        }
      ];
      return res.status(403).render('main', {
        page: 'index',
        path: '/',
        user: req.user,
        styles: ['index']
      });
    }
  } catch (error) {
    console.error(error);
    req.session.messages = [
      ...(req.session.messages || []),
      {
        variant: 'danger',
        content: 'Ocorreu um erro, por favor tente mais tarde.'
      }
    ];
    return res.status(500).redirect('/');
  }
});

router.post('/', requireAuth, async (req, res) => {
  let { name, privacy, links } = req.body;
  links = links.split(/\r\n|\r|\n/).filter(link => link);
  const videoIds = links.map(getVideoId);

  try {
    const { data } = await youtube.get('/videos', {
      params: {
        id: videoIds.join(','),
        part: 'snippet'
      }
    });

    data.items.forEach((videoInfo, i) => {
      const { title, thumbnails } = videoInfo.snippet;

      links[i] = {
        url: links[i],
        title: title,
        thumbnail: thumbnails.medium.url
      };
    });

    const newPlaylist = await Playlist.create({
      _user: req.user._id,
      name,
      privacy,
      links,
      totalLinks: links.length
    });

    req.session.messages = [
      ...(req.session.messages || []),
      {
        variant: 'success',
        content: `Playlist "${newPlaylist.name}" criada com sucesso!`
      }
    ];
    return res.redirect(`/playlists/${newPlaylist._id}`);
  } catch (error) {
    console.error(error);
    req.session.messages = [
      ...(req.session.messages || []),
      {
        variant: 'danger',
        content:
          'Ocorreu um erro ao criar sua Coleção. Por favor, tente mais tarde.'
      }
    ];
    return res.status(500).redirect('/');
  }
});

module.exports = router;
