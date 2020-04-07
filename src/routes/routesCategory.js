const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const authMiddleware = require('../middlewares/auth');

const Router = express.Router();

const CategoryController = require('../controllers/CategoryController');

Router.use(authMiddleware);

Router.get('/', CategoryController.index);

Router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required()
  })
}),CategoryController.create);

Router.put('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  }),

  [Segments.BODY]: Joi.object().keys({
    name: Joi.string()
  })
}), CategoryController.update);

Router.delete('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), CategoryController.delete);

module.exports = app => app.use('/category', Router);