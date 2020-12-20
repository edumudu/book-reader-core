import express, { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UserController from '../controllers/UserController';
import { authMiddleware } from '../middlewares';

const routes = express.Router();

routes.use(authMiddleware);

routes.patch(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string(),
      password: Joi.string(),
      confirmPassword: Joi.string().when('password', {
        is: Joi.exist(),
        then: Joi.required(),
        otherwise: Joi.string(),
      }),
    }),
  }),
  UserController.update,
);

routes.delete('/', UserController.delete);

export default (app: Router): Router => app.use('/user', routes);
