import express, { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AuthorController from '../controllers/AuthorController';
import { authMiddleware, moderationMiddleware } from '../middlewares';

const routes = express.Router();

routes.get(
  '/',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number().integer().min(1),
      perPage: Joi.number().integer().min(1),
      search: Joi.string(),
    }),
  }),
  AuthorController.index,
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
  AuthorController.store,
);

routes.patch(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().min(1).required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  AuthorController.update,
);

routes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().min(1).required(),
    },
  }),
  AuthorController.destroy,
);

export default (app: Router): Router => app.use('/author', routes);
