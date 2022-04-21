import { ObjectId } from 'bson';
import { logger } from '../../lib/logger/logger';
import { User } from '../dtos/user.dto';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { UserRepository } from '../repositories/user.repository';

export class UserService {
  private static instance: UserService;
  private userRepository = UserRepository.getInstance();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): UserService {
    if (!this.instance) {
      this.instance = new UserService();
    }
    return this.instance;
  }

  public getUsers() {
    logger.info({
      context: UserService.name,
      message: 'Retrieving all users',
    });
    return this.userRepository.getUsers();
  }

  public async getUser(id: ObjectId) {
    logger.info({
      context: UserService.name,
      message: `Retrieving user with id ${id}`,
    });

    const user = await this.userRepository.getUser(id);

    if (!user) {
      logger.warn({
        context: UserService.name,
        message: `The user with id ${id} was not found`,
      });
      throw new UserNotFoundException();
    }

    return user;
  }

  public async createUser(user: User) {
    logger.info({
      context: UserService.name,
      message: 'Creating user',
      user,
    });

    const newUser = await this.userRepository.createUser(user);

    logger.info({
      context: UserService.name,
      message: 'The user was successfully updated',
      newUser,
    });

    return newUser;
  }

  public async updateUser(id: ObjectId, user: User) {
    logger.info({
      context: UserService.name,
      message: `Updating user with id ${id}`,
      user,
    });
    const updatedUser = await this.userRepository.updateUser(id, user);

    if (!updatedUser) {
      logger.warn({
        context: UserService.name,
        message: `The user with id ${id} was not found`,
      });
      throw new UserNotFoundException();
    }

    logger.info({
      context: UserService.name,
      message: `The user with id ${id} was successfully updated`,
    });
    return updatedUser;
  }

  public async deleteUser(id: ObjectId) {
    logger.info({
      context: UserService.name,
      message: `Deleting user with id ${id}`,
    });
    const user = await this.userRepository.deleteUser(id);

    if (!user) {
      logger.warn({
        context: UserService.name,
        message: `The user with id ${id} was not found`,
      });
      throw new UserNotFoundException();
    }

    logger.info({
      context: UserService.name,
      message: `The user with id ${id} was successfully deleted`,
    });
    return user;
  }
}
