import { isMongoId } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export const isValidIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!isMongoId(id)) {
    return res.status(400).json({ message: `${id} is not a MongoId` });
  }

  next();
};
