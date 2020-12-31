import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import LanguageCOntroller from '../controllers/LanguageController';
import { authMiddleware, moderationMiddleware } from '../middlewares';

const routes = Router();

routes.get(
  '/',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      page: Joi.number().integer().min(1),
      perPage: Joi.number().integer().min(1),
    }),
  }),
  LanguageCOntroller.index,
);

routes.use(authMiddleware);
routes.use(moderationMiddleware);

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      unicode: Joi.string().required(),
    }),
  }),
  LanguageCOntroller.store,
);

routes.patch(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().min(1).required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      unicode: Joi.string(),
    }),
  }),
  LanguageCOntroller.update,
);

routes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().integer().min(1).required(),
    }),
  }),
  LanguageCOntroller.destroy,
);

export default (app: Router): Router => app.use('/language', routes);
