/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../enums/http-status.enum';
import { HttpException } from '../exceptions/http.exception';

export const errorHandlerMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(err.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR)
    .json({ message: err.message });
};
