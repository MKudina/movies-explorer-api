const { celebrate, Joi } = require('celebrate');

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
    name: Joi.string().min(2).max(30),
  }),
});

const deleteMovieValidate = celebrate({
  params: {
    movieId: Joi.string().length(24).hex(),
  },
});

module.exports = {
  createUserValidate,
  loginValidate,
  updateUserValidate,
  deleteMovieValidate,
};
