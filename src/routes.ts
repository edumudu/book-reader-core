import express, { Router } from 'express';

import routesCategory from './routes/routesCategory';
import rotuesBook from './routes/rotuesBook';
import routesUser from './routes/routesUser';
import routesAuth from './routes/routesAuth';
import routesCapter from './routes/routesCapter';
import routesAuthor from './routes/routesAuthor';
import routesArtists from './routes/routesArtists';

const router = express.Router();

joint([routesCategory, rotuesBook, routesUser, routesAuth, routesCapter, routesAuthor, routesArtists]);

function joint(functions: Array<(app: Router) => Router>): void {
  functions.forEach(fun => fun(router));
}

export default router;
