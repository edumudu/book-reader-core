const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const authMiddleware = require('../middlewares/auth');
const accessMiddleware = require('../middlewares/access');

const Router = express.Router();

const BookController = require('../controllers/BookController');

Router.get('/', BookController.index);
Router.get('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}),BookController.show);

Router.use(authMiddleware);
Router.use(accessMiddleware);

Router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    sinopse: Joi.string().required(),
    type: Joi.string().required(),
    author_id: Joi.number().required(),
    artist_id: Joi.number().required(),
    is_visible: Joi.bool().required(),
    categorys: Joi.array().required()
  })
}),BookController.create);

Router.delete('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}),BookController.delete);

Router.put('/:id', celebrate({
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

module.exports = app => app.use('/book', Router);