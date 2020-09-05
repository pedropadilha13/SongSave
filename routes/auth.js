const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.render('main', {
    page: 'login',
    title: 'Login | SongSave',
    styles: ['login']
  });
});

module.exports = router;
