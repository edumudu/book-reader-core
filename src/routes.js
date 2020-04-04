const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('./controllers/UserController');
const CategoryController = require('./controllers/CategoryController');
const BookController = require('./controllers/BookController');

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

// Books
Router.get('/book', BookController.index);

Router.post('/book', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().length(8).required()
  }).unknown(),

  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    sinopse: Joi.string().required(),
    posted_by: Joi.number().required(),
    type: Joi.string().required(),
    is_visible: Joi.bool().required(),
    categorys: Joi.array().required()
  })
}),BookController.create);

Router.delete('/book/:id', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().length(8).required()
  }).unknown(),

  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}),BookController.delete);

Router.put('/book/:id', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().length(8).required()
  }).unknown(),

  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  }),

  [Segments.BODY]: Joi.object().keys({
    name: Joi.string(),
    sinopse: Joi.string(),
    posted_by: Joi.number(),
    type: Joi.string(),
    is_visible: Joi.bool(),
    categorys: Joi.array()
  })
}), BookController.update);

module.exports = Router;
