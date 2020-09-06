module.exports = (req, res, next) => {
  res.locals.messages = req.session.messages;
  delete req.session.messages;
  return next();
};
