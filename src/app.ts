import express from 'express';
import 'reflect-metadata';
import { setupDatabase } from './config/db';
import {
  setupErrorHandlers,
  setupMiddlewares,
} from './middlewares/middlewares';
import { setupRoutes } from './routes/routes';

const app = express();

setupDatabase();
setupMiddlewares(app);
setupRoutes(app);
setupErrorHandlers(app);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
