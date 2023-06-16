const router = require('express').Router();
const rateLimit = require('express-rate-limit');

const auth = require('../middlewares/auth');
const { createUserValidation, loginValidation } = require('../middlewares/userValidation');
const { createUser, login } = require('../controllers/users');

const routeMovies = require('./movies');
const usersRouter = require('./users');
const NotFoundError = require('../errors/404-NotFoundError');
const authLimiterOptions = require('../configs/rateLimit');

const { requestLogger, errorLogger } = require('../configs/winston');

const authLimiter = rateLimit(authLimiterOptions);

router.use(requestLogger);

router.post('/signin', authLimiter, loginValidation, login);
router.post('/signup', authLimiter, createUserValidation, createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', routeMovies);

router.use((request, response, next) => {
  next(new NotFoundError('Ошибка: Страница не найдена'));
});

router.use(errorLogger);

module.exports = router;
