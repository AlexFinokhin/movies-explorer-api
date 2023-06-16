const errorHandler = (error, request, response, next) => {
  const { status = 500, message } = error;
  const errorMessage = status === 500 ? 'На сервере произошла ошибка' : message;
  response.status(status).json({ message: errorMessage });
  next();
};

module.exports = errorHandler;
