import express, { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import authMiddleware from '../middlewares/auth';
import accessMiddleware from '../middlewares/access';

const routes = express.Router();

import BookController from '../controllers/BookController';

routes.get('/', BookController.index);

routes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  BookController.show,
);

routes.use(authMiddleware);
routes.use(accessMiddleware);

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      sinopse: Joi.string().required(),
      type: Joi.string().required(),
      author_id: Joi.number().required(),
      artist_id: Joi.number().required(),
      is_visible: Joi.bool().required(),
      categories: Joi.array().required(),
    }),
  }),
  BookController.create,
);

routes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  BookController.delete,
);

routes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),

    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      sinopse: Joi.string(),
      posted_by: Joi.number(),
      type: Joi.string(),
      is_visible: Joi.bool(),
      categories: Joi.array(),
    }),
  }),
  BookController.update,
);

export default (app: Router): Router => app.use('/book', routes);
