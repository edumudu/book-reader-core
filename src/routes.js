const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('./controllers/UserController');
const CategoryController = require('./controllers/CategoryController');

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
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  }),

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

// Category
Router.get('/category', CategoryController.index);

Router.post('/category', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required()
  }),

  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().length(8).required()
  }).unknown()
}),CategoryController.create);

Router.put('/category/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  }),

  [Segments.BODY]: Joi.object().keys({
    name: Joi.string()
  }),

  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().length(8).required()
  }).unknown()
}), CategoryController.update);

Router.delete('/category/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  }),

  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().length(8).required()
  }).unknown()
}), CategoryController.delete);

module.exports = Router;
