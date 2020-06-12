import express, { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import authMiddleware from '../middlewares/auth';

import SessionController from '../controllers/SessionController';

const routes = express.Router();

routes.post(
  '/login',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  SessionController.create,
);

routes.use(authMiddleware);

routes.delete(
  '/logout',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  SessionController.delete,
);

export default (app: Router): Router => app.use('/auth', routes);
