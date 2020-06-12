import express, { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import authMiddleware from '../middlewares/auth';

const routes = express.Router();

import CategoryController from '../controllers/CategoryController';

routes.get('/', CategoryController.index);

routes.use(authMiddleware);

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  CategoryController.create,
);

routes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),

    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
    }),
  }),
  CategoryController.update,
);

routes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  CategoryController.delete,
);

export default (app: Router): Router => app.use('/category', routes);
