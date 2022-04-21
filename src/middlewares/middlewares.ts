import cors from 'cors';
import { Application, json, NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../enums/http-status.enum';
import { HttpException } from '../exceptions/http.exception';

export const setupMiddlewares = (app: Application) => {
  app.use(cors());
  app.use(json());
};

export const setupErrorHandlers = (app: Application) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: HttpException, _: Request, res: Response, __: NextFunction) => {
    res
      .status(err.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  });
};
