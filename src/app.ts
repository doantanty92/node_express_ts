/* eslint-disable import/first */
import { config as envConfig } from 'dotenv';

envConfig({ path: '.env' });

import express, { Application, Request, Response } from 'express';
import config from 'config';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'module-alias/register';

import AppDataSource from '@/utils/app-data-source';
import redisClient from '@/utils/redis';
import authRouter from '@/routes/auth.route';
import { errorMiddleware } from '@/middleware/error';

AppDataSource.initialize()
  .then(() => {
    const app: Application = express();
    const PORT = config.get<number>('port');
    const { NODE_ENV } = process.env;

    redisClient.connect();

    if (NODE_ENV === 'development') {
      app.use(morgan('dev'));
    }
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // API routes
    app.use('/api/v1/auth', authRouter);

    app.get('/', async (req: Request, res: Response) => {
      res.send('Hello World');
      const key = `demo_${Date.now()}`;
      redisClient.set(key, 'Hello World');

      const pattern = 'demo_*';
      console.log(await redisClient.keys(pattern));
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // LAST MIDDLEWARE
    app.use(errorMiddleware);
  })
  .catch((err) => {
    console.log('Database connection failed');
    console.log(err);
  });
