const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('main', {
    page: 'index',
    path: '/',
    user: req.user,
    styles: ['index']
  });
});

module.exports = router;
