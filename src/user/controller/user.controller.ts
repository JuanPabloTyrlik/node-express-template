import { ObjectId } from 'bson';
import { plainToInstance } from 'class-transformer';
import { NextFunction, Request, Response, Router } from 'express';
import { HttpStatus } from '../../enums/http-status.enum';
import { isValidIdMiddleware } from '../../middlewares/is-valid-id.middleware';
import { isValidUserMiddleware } from '../../middlewares/is-valid-user.middleware';
import { User } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

export const userRouter = Router();
const userService = UserService.getInstance();

userRouter.get('/', async (_: Request, res: Response) => {
  const users = await userService.getUsers();

  return res.json({ users });
});

userRouter.get(
  '/:id',
  isValidIdMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = new ObjectId(req.params.id);

      const user = await userService.getUser(userId);

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post(
  '/',
  isValidUserMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = plainToInstance(User, req.body, {
        excludeExtraneousValues: true,
      });

      const user = await userService.createUser(userData);

      return res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.put(
  '/:id',
  [isValidIdMiddleware, isValidUserMiddleware],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = new ObjectId(req.params.id);
      const userData = plainToInstance(User, req.body, {
        excludeExtraneousValues: true,
      });

      const user = await userService.updateUser(userId, userData);

      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.delete(
  '/:id',
  isValidIdMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = new ObjectId(req.params.id);

      await userService.deleteUser(userId);

      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
);
