/* eslint-disable import/first */
import { config as envConfig } from 'dotenv';

envConfig({ path: '.env' });

import bodyParser from 'body-parser';
import config from 'config';
import cors from 'cors';
import express, { Application } from 'express';
import 'module-alias/register';
import morgan from 'morgan';

import AppDataSource from '@/utils/app-data-source';
// import redisClient from '@/utils/redis';
import { errorMiddleware } from '@/middleware/error';
import authRouter from '@/routes/auth.route';

// establish database connection
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

const app: Application = express();
const PORT = config.get<number>('port');
const { NODE_ENV } = process.env;

// redisClient.connect();

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use('/api/v1/auth', authRouter);

// error middleware
app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
