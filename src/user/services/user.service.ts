import { ObjectId } from 'bson';
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
    return this.userRepository.getUsers();
  }

  public async getUser(id: ObjectId) {
    const user = await this.userRepository.getUser(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  public createUser(user: User) {
    return this.userRepository.createUser(user);
  }

  public async updateUser(id: ObjectId, user: User) {
    const updatedUser = await this.userRepository.updateUser(id, user);

    if (!updatedUser) {
      throw new UserNotFoundException();
    }

    return updatedUser;
  }

  public async deleteUser(id: ObjectId) {
    const user = await this.userRepository.deleteUser(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
