// Регулярное выражение для проверки URL
const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;

// Регулярное выражение для проверки пароля:
// - Должен содержать хотя бы одну букву
// - Должен содержать хотя бы одну цифру
// - Должен содержать хотя бы один из следующих символов: !@#$%^&*
// - Длина пароля должна быть не менее 8 символов
const passwordPattern = /^(?=.*[A-z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/;

// Регулярное выражение для проверки электронной почты
const emailPattern = /.+@.+\..+/;

// Сообщения валидации для различных полей и условий
const VALIDATION_ERRORS = {
  email: {
    empty: 'Пожалуйста, заполните поле "email"',
    invalid: 'Ошибка: некорректный адрес электронной почты',
  },
  user:
    'Имя пользователя должно быть заполнено и содержать от 2 до 30 символов',
  movieId: {
    invalid: 'Ошибка: некорректный идентификатор фильма',
    empty: 'Пожалуйста, заполните поле "movieId"',
  },
  country: 'Пожалуйста, заполните поле "country"',
  director: 'Пожалуйста, заполните поле "director"',
  duration: 'Пожалуйста, заполните поле "duration" фильма',
  year: 'Пожалуйста, заполните поле "year" выпуска',
  description: 'Пожалуйста, заполните поле "description"',
  image: 'Пожалуйста, заполните поле "image"',
  trailerLink: 'Пожалуйста, заполните поле "trailerLink"',
  thumbnail: 'Пожалуйста, заполните поле "thumbnail"',
  nameRU: 'Пожалуйста, заполните поле "nameRU" название фильма',
  nameEN: 'Пожалуйста, заполните поле "nameEN" название фильма',
  invalidUrl: 'Ошибка: некорректный URL',
  owner: 'Пожалуйста, заполните поле "owner"',
};

// Ошибки валидации фильма
const movieValidationErrors = {
  BadRequestError: 'Ошибка: неверные данные для добавления фильма.',
  NotFoundError: 'Ошибка: указан недействительный идентификатор фильма.',
  ForbiddenError: 'Ошибка: фильм не может быть удален.',
};

// Ошибки валидации пользователя
const userValidationErrors = {
  NotFoundError: 'Ошибка: пользователь с указанным идентификатором не найден',
  ConflictError: 'Ошибка: пользователь с таким email уже существует.',
  BadRequestError: 'Ошибка: некорректные данные',
  UnauthorizedError: 'Ошибка: неверный email или пароль',
};

// Ошибки аутентификации
const authValidationErrors = {
  UnauthorizedError: 'Для продолжения требуется вход в систему!',
};

// Код успешного завершения запроса
const STATUS_OK = 200;

// Код успешного создания ресурса
const STATUS_CREATED = 201;

module.exports = {
  passwordPattern,
  emailPattern,
  urlPattern,
  VALIDATION_ERRORS,
  movieValidationErrors,
  userValidationErrors,
  authValidationErrors,
  STATUS_OK,
  STATUS_CREATED,
};
