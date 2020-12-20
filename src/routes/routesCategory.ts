import express, { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CategoryController from '../controllers/CategoryController';
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
  CategoryController.index,
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
  CategoryController.store,
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
  CategoryController.update,
);

routes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().min(1).required(),
    }),
  }),
  CategoryController.delete,
);

export default (app: Router): Router => app.use('/category', routes);
