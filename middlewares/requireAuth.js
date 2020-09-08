module.exports = (req, res, next) => {
  if (!req.user) {
    req.session.messages = [
      {
        variant: 'danger',
        content:
          'Você precisa estar logado conseguir acessar a página solicitada'
      }
    ];
    return res.status(403).redirect('/auth');
  }
  return next();
};
