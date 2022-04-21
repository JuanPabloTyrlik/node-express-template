import { isMongoId } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../enums/http-status.enum';

export const isValidIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!isMongoId(id)) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: `${id} is not a MongoId` });
  }

  next();
};
