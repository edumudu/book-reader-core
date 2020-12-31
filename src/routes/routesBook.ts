import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import BookController from '../controllers/BookController';
import { authMiddleware, moderationMiddleware } from '../middlewares';

const routes = Router();

routes.get(
  '/',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      page: Joi.number().integer().min(1),
      perPage: Joi.number().integer().min(1),
      search: Joi.string(),
    }),
  }),
  BookController.index,
);

routes.use(authMiddleware);
routes.use(moderationMiddleware);

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      type: Joi.string().valid('manga', 'novel').required(),
      authorsIds: Joi.array().items(Joi.number().integer().min(1)).min(1).required(),
      artistsIds: Joi.array().items(Joi.number().integer().min(1)).min(1).required(),
      categoryIds: Joi.array().items(Joi.number().integer().min(1)).min(1).required(),
    }),
  }),
  BookController.store,
);

routes.patch(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().min(1).required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      type: Joi.string().valid('manga', 'novel').required(),
      authorsIds: Joi.array().items(Joi.number().integer().min(1)).min(1).required(),
      artistsIds: Joi.array().items(Joi.number().integer().min(1)).min(1).required(),
      categoryIds: Joi.array().items(Joi.number().integer().min(1)).min(1).required(),
    }),
  }),
  BookController.update,
);

routes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().min(1).required(),
    }),
  }),
  BookController.destroy,
);

export default (app: Router): Router => app.use('/book', routes);
