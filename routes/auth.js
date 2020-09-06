const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/User');

const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;

router.get('/', (req, res) => {
  return res.render('main', {
    page: 'login',
    title: 'Login | SongSave',
    styles: ['login']
  });
});

router.post(
  '/',
  passport.authenticate('local', {
    failureRedirect: '/auth',
    successRedirect: '/',
    failWithError: true
  })
);

router.get('/signup', (req, res) => {
  return res.render('main', {
    page: 'signup',
    title: 'Signup | SongSave',
    styles: ['signup']
  });
});

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password, password2 } = req.body;

  const errors = {};

  if (!firstName) {
    errors.firstName = 'Campo obrigatório';
  }

  if (!lastName) {
    errors.lastName = 'Campo obrigatório';
  }

  if (!email) {
    errors.email = 'Campo obrigatório';
  } else if (!email.match(EMAIL_REGEX)) {
    errors.email = 'E-mail inválido';
  } else {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      errors.email = 'Email já cadastrado';
    }
  }

  if (password.length < 8) {
    errors.password = 'A senha deve conter pelo menos 8 caracteres';
  } else {
    if (password !== password2) {
      errors.password = 'As senhas informadas não são iguais';
    }
  }

  if (Object.keys(errors).length !== 0) {
    return res.status(422).render('main', {
      page: 'signup',
      title: 'Signup | SongSave',
      styles: ['signup'],
      errors,
      values: { firstName, lastName, email, password, password2 }
    });
  }

  try {
    await User.create({ firstName, lastName, email, password });
    req.session.messages = [
      ...(req.session.messages || []),
      { variant: 'success', content: 'Cadastro realizado com sucesso!' }
    ];
    return res.status(201).redirect('/auth');
  } catch (error) {
    console.error(error);
    return res.status(500).render('main', {
      page: 'signup',
      title: 'Signup | SongSave',
      styles: ['signup']
    });
  }
});

module.exports = router;
