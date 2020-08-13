import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import { createConnection } from 'typeorm';
import routes from './routes';

import 'dotenv/config';
import 'reflect-metadata';

const app = express();

createConnection()
  .then(() => {
    app.use(cors());
    app.use(express.json());
    app.use('/api', routes);
    app.use(errors());
  })
  .catch(console.error);

export default app;
