import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use(errors());

export default app;
