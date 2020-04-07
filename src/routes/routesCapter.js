const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const authMiddleware = require('../middlewares/auth');
const accesMiddleware = require('../middlewares/access');

const Router = express.Router();

const CaptuloController = require('../controllers/CaptuloController');

Router.use(authMiddleware);

Router.get('/', CaptuloController.index);

Router.use(accesMiddleware);

Router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string(),
    book_id: Joi.number().required(),
    posted_by: Joi.number().required()
  })
}), CaptuloController.create);

Router.delete('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), CaptuloController.delete);

Router.put('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  }),

  [Segments.BODY]: Joi.object().keys({
    name: Joi.string(),
    book_id: Joi.number()
  })
}), CaptuloController.update);

module.exports = app => app.use('/capter', Router);