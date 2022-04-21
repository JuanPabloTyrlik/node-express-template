import { NextFunction, Request, Response } from 'express';
import { logger } from '../logger';

export const loggerMiddleware = (
  { method, path, params, body }: Request,
  _: Response,
  next: NextFunction
) => {
  logger.info({
    context: 'LoggerMiddleware',
    message: 'Request Received',
    method,
    path,
    params,
    body,
  });
  next();
};
