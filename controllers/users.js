const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const ConflictError = require('../errors/409-ConflictError');
const NotFoundError = require('../errors/404-NotFoundError');
const BadRequestError = require('../errors/400-BadRequestError');
const UnauthorizedError = require('../errors/401-UnauthorizedError');

const {
  userValidationErrors,
  STATUS_OK,
  STATUS_CREATED,
} = require('../constants/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

async function getUser(request, response, next) {
  try {
    const user = await User.findById(request.user._id);
    if (!user) {
      throw new NotFoundError(userValidationErrors.NotFoundError);
    }
    response.status(STATUS_OK).send(user);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequestError(userValidationErrors.BadRequestError));
    } else {
      next(error);
    }
  }
}

async function createUser(request, response, next) {
  const
    {
      email,
      password,
      name,
    } = request.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hash,
    });

    response.status(STATUS_CREATED).send({ message: 'Пользователь успешно зарегистрирован' });
  } catch (error) {
    if (error.code === 11000) {
      next(new ConflictError(userValidationErrors.ConflictError));
    } else if (error.name === 'ValidationError') {
      next(new BadRequestError(userValidationErrors.BadRequestError));
    } else {
      next(error);
    }
  }
}

async function updateUser(request, response, next) {
  try {
    const { name, email } = request.body;
    const user = await User.findByIdAndUpdate(
      request.user._id,
      { name, email },
      { new: true, runValidators: true },
    );

    if (!user) {
      throw new NotFoundError(userValidationErrors.NotFoundError);
    } else {
      response.status(STATUS_OK).send(user);
    }
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequestError(userValidationErrors.BadRequestError));
    } else if (error.code === 11000) {
      next(new ConflictError(userValidationErrors.ConflictError));
    } else {
      next(error);
    }
  }
}

async function login(request, response, next) {
  try {
    const { email, password } = request.body;

    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'ryangosling', {
      expiresIn: '7d',
    });

    response.json({ token });
  } catch (error) {
    if (error.name === 'AuthenticationError') {
      next(new UnauthorizedError(userValidationErrors.UnauthorizedError));
    } else {
      next(error);
    }
  }
}

module.exports = {
  getUser,
  updateUser,
  createUser,
  login,
};
