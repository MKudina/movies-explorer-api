const { celebrate, Joi } = require('celebrate');

const regexLink = /^(https?:\/\/)(w{3,3}\.)?([\w-]+)\.([\w]{1,3})[^\s@]*/;

const createUserValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const updateUserValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const deleteMovieValidate = celebrate({
  params: {
    movieId: Joi.string().required().length(24).hex(),
  },
});

const createMovieValidate = celebrate({
  body: Joi.object().keys({
    contry: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regexLink),
    trailerLink: Joi.string().required().pattern(regexLink),
    thumbnail: Joi.string().required().pattern(regexLink),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  createUserValidate,
  loginValidate,
  updateUserValidate,
  deleteMovieValidate,
  createMovieValidate,
};
