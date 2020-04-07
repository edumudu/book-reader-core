const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const authMiddleware = require('../middlewares/auth');

const SessionController = require('../controllers/SessionController');

const Router = express.Router();

Router.post('/login', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
}), SessionController.create);

Router.use(authMiddleware);

Router.delete('/logout', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
}), SessionController.delete);

module.exports = app => app.use('/auth', Router);