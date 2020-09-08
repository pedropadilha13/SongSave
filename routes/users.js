const express = require('express');
const router = express.Router();

const { requireAuth } = require('../middlewares');

router.get('/me', requireAuth, (req, res) => {
  return res.json(req.user);
});

module.exports = router;
