import express from 'express';
import 'reflect-metadata';
import { setupDatabase } from './config/db';
import { logger } from './lib/logger/logger';
import {
  setupErrorHandlers,
  setupMiddlewares
} from './middlewares/middlewares';
import { setupRoutes } from './routes/routes';

const app = express();

setupDatabase();
setupMiddlewares(app);
setupRoutes(app);
setupErrorHandlers(app);

app.listen(process.env.PORT, () => {
  logger.info({context: 'Application', message: `Listening on port ${process.env.PORT}`});
});
