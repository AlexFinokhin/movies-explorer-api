const Joi = require('joi');
const { celebrate } = require('celebrate');

const { emailPattern, passwordPattern } = require('../constants/constants');
const { VALIDATION_ERRORS } = require('../constants/constants');

const createUserValidation = async (req, res, next) => {
  try {
    await celebrate({
      body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30)
          .message(VALIDATION_ERRORS.user),
        email: Joi.string().required().email().pattern(emailPattern),
        password: Joi.string().required().pattern(passwordPattern),
      }),
    })(req, res, next);
  } catch (error) {
    next(error);
  }
};

const loginValidation = async (req, res, next) => {
  try {
    await celebrate({
      body: Joi.object().keys({
        email: Joi.string().required().email().pattern(emailPattern),
        password: Joi.string().required().pattern(passwordPattern),
      }),
    })(req, res, next);
  } catch (error) {
    next(error);
  }
};

const updateUserValidation = async (req, res, next) => {
  try {
    await celebrate({
      body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30)
          .message(VALIDATION_ERRORS.user),
        email: Joi.string().required().pattern(emailPattern),
      }),
    })(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUserValidation,
  loginValidation,
  updateUserValidation,
};
