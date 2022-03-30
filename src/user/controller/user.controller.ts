import { ObjectId } from 'bson';
import { Request, Response, Router } from 'express';
import { isValidIdMiddleware } from '../../middlewares/is-valid-id.middleware';
import { isValidUserMiddleware } from '../../middlewares/is-valid-user.middleware';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { UserService } from '../services/user.service';

export const userRouter = Router();
const userService = UserService.getInstance();

userRouter.get('/', async (req: Request, res: Response) => {
  const users = await userService.getUsers();

  return res.json({ users });
});

userRouter.get(
  '/:id',
  isValidIdMiddleware,
  async (req: Request, res: Response) => {
    const userId = new ObjectId(req.params.id);
    try {
      const user = await userService.getUser(userId);

      return res.json(user);
    } catch (error) {
      if (error instanceof UserNotFoundException)
        return res.status(404).json({ message: 'The user was not found' });
      throw error;
    }
  }
);

userRouter.post(
  '/',
  isValidUserMiddleware,
  async (req: Request, res: Response) => {
    const userData = req.body;
    const user = await userService.createUser(userData);

    return res.status(201).json(user);
  }
);

userRouter.put(
  '/:id',
  [isValidIdMiddleware, isValidUserMiddleware],
  async (req: Request, res: Response) => {
    try {
      const userId = new ObjectId(req.params.id);
      const userData = req.body;
      const user = await userService.updateUser(userId, userData);

      return res.json(user);
    } catch (error) {
      if (error instanceof UserNotFoundException)
        return res.status(404).json({ message: 'The user was not found' });
      throw error;
    }
  }
);

userRouter.delete(
  '/:id',
  isValidIdMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = new ObjectId(req.params.id);
      await userService.deleteUser(userId);

      return res.status(204).send();
    } catch (error) {
      if (error instanceof UserNotFoundException)
        return res.status(404).json({ message: 'The user was not found' });
      throw error;
    }
  }
);
