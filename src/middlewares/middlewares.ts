import cors from 'cors';
import { Application, json, NextFunction, Request, Response } from 'express';

export const setupMiddlewares = (app: Application) => {
  app.use(cors());
  app.use(json());
  app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
};
