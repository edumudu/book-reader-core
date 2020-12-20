import express, { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import authMiddleware from '../middlewares/auth';
import AuthController from '../controllers/AuthController';

const routes = express.Router();

routes.post(
  '/register',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    }),
  }),
  AuthController.register,
);

routes.post(
  '/login',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  AuthController.login,
);

routes.use(authMiddleware);

routes.get('/me', AuthController.me);
routes.delete('/logout', AuthController.delete);

export default (app: Router): Router => app.use('/auth', routes);
