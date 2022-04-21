import cors from 'cors';
import { Application, json } from 'express';
import { errorLoggerMiddleware } from '../lib/logger/middlewares/error-logger.middleware';
import { loggerMiddleware } from '../lib/logger/middlewares/logger.middleware';
import { errorHandlerMiddleware } from './error-handler.middleware';

export const setupMiddlewares = (app: Application) => {
  app.use(cors());
  app.use(json());
  app.use(loggerMiddleware);
};

export const setupErrorHandlers = (app: Application) => {
  app.use(errorLoggerMiddleware);
  app.use(errorHandlerMiddleware);
};
