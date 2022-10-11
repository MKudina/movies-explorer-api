require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { limiter } = require('./utils/RateLimit');
const auth = require('./middlewares/auth');
const errorHandle = require('./middlewares/errorHandle');
const NotFoundError = require('./utils/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUserValidate, loginValidate } = require('./utils/Validators');
const { createUser, login } = require('./controllers/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : 'mongodb://localhost:27017/moviedb');

app.use(requestLogger);
app.use(cors());
app.use(helmet());

app.use('/', limiter);

app.post('/signup', createUserValidate, createUser);
app.post('/signin', loginValidate, login);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandle);

app.listen(process.env.NODE_ENV === 'production' ? process.env.PORT : '3000', () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${process.env.NODE_ENV === 'production' ? process.env.PORT : '3000'}`);
});

// ssh kudina@51.250.80.58
// api.movies-kudina.nomoredomains.icu
