import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import OrganizationController from '../controllers/OrganizationController';
import { authMiddleware } from '../middlewares';

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
  OrganizationController.index,
);

routes.use(authMiddleware);

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  OrganizationController.store,
);

routes.patch(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().min(1),
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  OrganizationController.update,
);

routes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().min(1),
    }),
  }),
  OrganizationController.destroy,
);

export default (app: Router) => app.use('/organiation', routes);
