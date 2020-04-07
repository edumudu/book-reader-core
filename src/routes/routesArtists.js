const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const authMiddleware = require('../middlewares/auth');
const accessMiddleware = require('../middlewares/access');

const Router = express.Router();

const ArtistController = require('../controllers/ArtistController');

Router.use(authMiddleware);
Router.use(accessMiddleware);

Router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required()
  })
}), ArtistController.create);

module.exports = app => app.use('/artist', Router);