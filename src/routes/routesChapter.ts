import express, { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

const routes = express.Router();

import ChapterController from '../controllers/ChapterController';
import { authMiddleware, moderationMiddleware } from '../middlewares';

routes.get(
  '/',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      page: Joi.number().integer().min(1),
      perPage: Joi.number().integer().min(1),
    }),
  }),
  ChapterController.index,
);

routes.use(authMiddleware);

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      number: Joi.number().required(),
      bookId: Joi.number().integer().min(1).required(),
    }),
  }),
  ChapterController.store,
);

routes.use(moderationMiddleware);

routes.patch(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().min(1).required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      number: Joi.number().required(),
    }),
  }),
  ChapterController.update,
);

routes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().min(1).required(),
    }),
  }),
  ChapterController.destroy,
);

export default (app: Router): Router => app.use('/chapter', routes);
