const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/401-UnauthorizedError');
const { authValidationErrors } = require('../constants/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

async function verifyToken(request, response, next) {
  const { authorization } = request.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const error = new UnauthorizedError(authValidationErrors.UnauthorizedError);
    return next(error);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = await jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'ryangosling');
  } catch (err) {
    const error = new UnauthorizedError(authValidationErrors.UnauthorizedError);
    return next(error);
  }

  request.user = payload;
  return next();
}

module.exports = verifyToken;
