import express from 'express';
import { setupDatabase } from './config/db';
import { setupMiddlewares } from './middlewares/middlewares';
import { setupRoutes } from './routes/routes';

const app = express();

setupMiddlewares(app);
setupRoutes(app);
setupDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
