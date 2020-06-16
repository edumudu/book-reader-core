import express, { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import authMiddleware from '../middlewares/auth';
import accesMiddleware from '../middlewares/access';

const routes = express.Router();

import CaptuloController from '../controllers/CaptuloController';

routes.use(authMiddleware);

routes.get('/', CaptuloController.index);

routes.use(accesMiddleware);

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      book_id: Joi.number().required(),
    }),
  }),
  CaptuloController.create,
);

routes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  CaptuloController.delete,
);

routes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),

    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      book_id: Joi.number(),
    }),
  }),
  CaptuloController.update,
);

export default (app: Router): Router => app.use('/capter', routes);
