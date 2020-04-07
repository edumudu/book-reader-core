const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const authMiddleware = require('../middlewares/auth');

const Router = express.Router();

const UserController = require('../controllers/UserController');

Router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    access_level: Joi.string()
  })
}), UserController.create);

Router.use(authMiddleware);

Router.get('/', UserController.get);

Router.put('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  }),

  [Segments.BODY]: Joi.object().keys({
    username: Joi.string(),
    password: Joi.string(),
    access_level: Joi.string(),
  })
}), UserController.update);

Router.delete('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), UserController.delete);

module.exports = app => app.use('/user', Router);