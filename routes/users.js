const userRoutes = require('express')
  .Router();

const {
  getUser,
  updateUser,
} = require('../controllers/users');

const { updateUserValidation } = require('../middlewares/userValidation');

userRoutes.get('/me', getUser);
userRoutes.patch('/me', updateUserValidation, updateUser);

module.exports = userRoutes;
