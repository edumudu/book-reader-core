import express, { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import authMiddleware from '../middlewares/auth';
import accessMiddleware from '../middlewares/access';

const routes = express.Router();

import ArtistController from '../controllers/ArtistController';

routes.use(authMiddleware);
routes.use(accessMiddleware);

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  ArtistController.create,
);

export default (app: Router): Router => app.use('/artist', routes);
