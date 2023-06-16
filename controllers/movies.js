const Movie = require('../models/movie');

const NotFoundError = require('../errors/404-NotFoundError');
const BadRequestError = require('../errors/400-BadRequestError');
const ForbiddenError = require('../errors/403-ForbiddenError');

const {
  movieValidationErrors,
  userValidationErrors,
  STATUS_OK,
  STATUS_CREATED,
} = require('../constants/constants');

async function getMovies(request, response, next) {
  try {
    const { _id } = request.user;

    const movies = await Movie.find({ owner: _id });

    response.status(STATUS_OK).send(movies.reverse());
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequestError(userValidationErrors.BadRequestError));
    } else {
      next(error);
    }
  }
}

async function createMovie(request, response, next) {
  try {
    const { _id } = request.user;
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = request.body;

    await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      owner: _id,
      nameRU,
      nameEN,
    });

    response.status(STATUS_CREATED).send({ message: 'Фильм добавлен' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(movieValidationErrors.BadRequestError));
    } else {
      next(err);
    }
  }
}

async function deleteMovie(request, response, next) {
  try {
    const currentUserId = request.user._id;

    const movie = await Movie.findById(request.params._id).orFail();
    const ownerId = movie.owner.toString();

    if (ownerId !== currentUserId) {
      throw new ForbiddenError(movieValidationErrors.ForbiddenError);
    }

    await movie.deleteOne();

    response.send({ message: 'Фильм удалён' });
  } catch (err) {
    if (err.name === 'DocumentNotFoundError') {
      next(new NotFoundError(movieValidationErrors.NotFoundError));
    } else {
      next(err);
    }
  }
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
