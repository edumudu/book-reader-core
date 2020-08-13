import express, { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import authMiddleware from '../middlewares/auth';
import accessMiddleware from '../middlewares/access';

const routes = express.Router();

import AuthorController from '../controllers/AuthorController';

routes.get('/', AuthorController.idnex);

routes.use(authMiddleware);
routes.use(accessMiddleware);

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  AuthorController.create,
);

export default (app: Router): Router => app.use('/author', routes);
