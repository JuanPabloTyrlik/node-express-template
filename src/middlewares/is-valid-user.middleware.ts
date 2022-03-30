import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { User } from '../user/dtos/user.dto';

export const isValidUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = new User();

  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;

  const errors = await validate(user);

  if (errors.length) {
    return res.status(400).json({ errors });
  }

  next();
};
