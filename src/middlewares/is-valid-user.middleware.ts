import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../enums/http-status.enum';
import { User } from '../user/dtos/user.dto';

export const isValidUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = plainToInstance(User, req.body ?? {}, {
    excludeExtraneousValues: true,
  });

  const errors = await validate(user, { whitelist: true });

  if (errors.length) {
    return res.status(HttpStatus.BAD_REQUEST).json({ errors });
  }

  next();
};
