const Movie = require('../models/movie');
const NotFoundError = require('../utils/NotFoundError');
const BadRequestError = require('../utils/BadRequestError');
const ForbiddenError = require('../utils/Forbidden');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send({ movie }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    contry, director, duration, year, description, image,
    trailerLink, thumbnail, nameRU, nameEN,
  } = req.body;

  Movie.create({
    contry,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
        return;
      }
      next();
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найдена');
      }
      if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError('Нельзя удалить фильм другого пользователя!');
      }
      return movie.remove().then(res.send({ movie }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные'));
        return;
      }
      next(err);
    });
};
