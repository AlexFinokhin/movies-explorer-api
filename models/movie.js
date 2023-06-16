const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
const { VALIDATION_ERRORS } = require('../constants/constants');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, VALIDATION_ERRORS.country],
    },
    director: {
      type: String,
      required: [true, VALIDATION_ERRORS.director],
    },
    duration: {
      type: Number,
      required: [true, VALIDATION_ERRORS.duration],
    },
    year: {
      type: Number,
      required: [true, VALIDATION_ERRORS.year],
    },
    description: {
      type: String,
      required: [true, VALIDATION_ERRORS.description],
    },
    image: {
      type: String,
      required: [true, VALIDATION_ERRORS.image],
      validate: {
        validator: isURL,
        message: VALIDATION_ERRORS.invalidUrl,
      },
    },
    trailerLink: {
      type: String,
      required: [true, VALIDATION_ERRORS.trailerLink],
      validate: {
        validator: isURL,
        message: VALIDATION_ERRORS.invalidUrl,
      },
    },
    thumbnail: {
      type: String,
      required: [true, VALIDATION_ERRORS.thumbnail],
      validate: {
        validator: isURL,
        message: VALIDATION_ERRORS.invalidUrl,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, VALIDATION_ERRORS.owner],
    },
    movieId: {
      type: Number,
      required: [true, VALIDATION_ERRORS.movieId],
    },
    nameRU: {
      type: String,
      required: [true, VALIDATION_ERRORS.nameRU],
    },
    nameEN: {
      type: String,
      required: [true, VALIDATION_ERRORS.nameEN],
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
