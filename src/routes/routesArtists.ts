import express, { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { authMiddleware, moderationMiddleware } from '../middlewares';

import ArtistController from '../controllers/ArtistController';

const routes = express.Router();

routes.get(
  '/',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      page: Joi.number().integer().min(1),
      perPage: Joi.number().integer().min(1),
      search: Joi.string(),
    }),
  }),
  ArtistController.index,
);

routes.use(authMiddleware);
routes.use(moderationMiddleware);

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  ArtistController.store,
);

routes.patch(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().min(1).required(),
    },
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  ArtistController.update,
);

routes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().min(1).required(),
    },
  }),
  ArtistController.destroy,
);

export default (app: Router): Router => app.use('/artist', routes);
