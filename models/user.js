const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const { VALIDATION_ERRORS, userValidationErrors } = require('../constants/constants');
const UnauthorizedError = require('../errors/401-UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, VALIDATION_ERRORS.user],
    minlength: [2, VALIDATION_ERRORS.user],
    maxlength: [30, VALIDATION_ERRORS.user],
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isEmail,
      message: VALIDATION_ERRORS.email.invalid,
    },
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = async function _(email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    return Promise.reject(new UnauthorizedError(userValidationErrors.UnauthorizedError));
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    return Promise.reject(new UnauthorizedError(userValidationErrors.UnauthorizedError));
  }

  return user;
};

module.exports = mongoose.model('user', userSchema);
