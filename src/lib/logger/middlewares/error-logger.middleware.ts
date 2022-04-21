import { NextFunction, Request, Response } from 'express';
import { logger } from '../logger';

export const errorLoggerMiddleware = (
  error: Error,
  { method, path, params, body }: Request,
  _: Response,
  next: NextFunction
) => {
  logger.info({
    context: 'ErrorLoggerMiddleware',
    message: error.message,
    method,
    path,
    params,
    body,
  });
  next(error);
};
