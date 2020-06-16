import express, { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import authMiddleware from '../middlewares/auth';

const routes = express.Router();

import UserController from '../controllers/UserController';

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      access_level: Joi.string(),
    }),
  }),
  UserController.create,
);

routes.use(authMiddleware);

routes.get('/', UserController.me);

routes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),

    [Segments.BODY]: Joi.object().keys({
      username: Joi.string(),
      password: Joi.string(),
      access_level: Joi.string(),
    }),
  }),
  UserController.update,
);

routes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  UserController.delete,
);

export default (app: Router): Router => app.use('/user', routes);
