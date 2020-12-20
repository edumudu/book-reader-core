import express, { Router } from 'express';

import * as routes from './routes';

const router = express.Router();

const joint = (functions: Array<(app: Router) => Router>): void => {
  functions.forEach(fun => fun(router));
};

joint(Object.values(routes));

export default router;
