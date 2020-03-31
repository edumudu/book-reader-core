const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('./controllers/UserController');

const Router = express.Router();

Router.post('/user', celebrate({
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    access_level: Joi.string()
  })
}), UserController.create);

Router.put('/user/:id', celebrate({
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string(),
    password: Joi.string(),
    access_level: Joi.string(),
  }),

  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().length(8).required()
  }).unknown()
}), UserController.update);

Router.delete('/user/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  }),

  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().length(8).required()
  }).unknown()
}), UserController.delete);

module.exports = Router;
