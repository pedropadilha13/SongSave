const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('main', { name: 'Joãozinho' });
});

module.exports = router;
