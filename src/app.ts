import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import { createConnection } from 'typeorm';

import { errorMidleware } from './helpers/errors';

import router from './router';

const app = express();

createConnection()
  .then(() => {
    app.use(cors());
    app.use(express.json());
    app.use('/api', router);
    app.use(errors());

    // Custom error handler
    app.use(errorMidleware);
  })
  .catch(console.error);

export default app;
