require('dotenv').config();

// Normalmente importamos todos os pacotes que usamos no arquivo aqui no topo

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const connectDB = require('./services/db');
require('./models/User');
require('./models/Link');
require('./models/Playlist');

connectDB();

// Aqui são importadas as duas rotas do template do Express, index e users
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Invocando express(), criamos a nossa aplicação Express
const app = express();

// Aqui configuramos onde as nossas views estão localizadas
app.set('views', path.join(__dirname, 'views'));
// E agora estamos dizendo que queremos usar EJS como view engine
app.set('view engine', 'ejs');

// app.use -> Adiciona funções middleware na rota especificada
// Caso ela não seja especificada, a rota base '/' é usada
// app.use pode receber uma ou mais funções, que são executadas na ordem em que são fornecidas

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Aqui, identificamos o caminho e em seguida passamos a rota (que importamos no topo do arquivo)
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Este middleware será executado quando nenhuma rota for encontrada para satisfazer a requisição
// Invocamos next passando um novo erro 404 (Not Found)
app.use(function (req, res, next) {
  next(createError(404));
});

// Este é nosso Error Handler, responsável por renderizar a página de erro
// Mais para frente, vamos modificar a view 'error' para que mostre informações além do código e nome do erro
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
