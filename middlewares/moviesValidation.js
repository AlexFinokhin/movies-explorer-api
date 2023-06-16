const { celebrate, Joi } = require('celebrate');

const { urlPattern } = require('../constants/constants');

const createMovieValidation = async (req, res, next) => {
  try {
    await celebrate({
      body: Joi.object().keys({
        description: Joi.string().required(),
        director: Joi.string().required(),
        duration: Joi.number().required(),
        country: Joi.string().required(),
        nameRU: Joi.string().required(),
        nameEN: Joi.string().required(),
        year: Joi.number().required(),
        thumbnail: Joi.string().required().pattern(urlPattern),
        trailerLink: Joi.string().required().pattern(urlPattern),
        image: Joi.string().required().pattern(urlPattern),
        movieId: Joi.number().required(),
      }),
    })(req, res, next);
  } catch (error) {
    next(error);
  }
};

const deleteMovieValidation = async (req, res, next) => {
  try {
    await celebrate({
      params: Joi.object().keys({
        _id: Joi.string().length(24).hex().required(),
      }),
    })(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMovieValidation,
  deleteMovieValidation,
};
