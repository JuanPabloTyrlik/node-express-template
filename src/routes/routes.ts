import { Application } from 'express';
import { userRouter } from '../user/controller/user.controller';

export const setupRoutes = (app: Application) => {
  app.use('/users', userRouter);
};
