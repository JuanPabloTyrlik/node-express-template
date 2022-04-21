import { ObjectId } from 'bson';
import { Model } from 'mongoose';
import { logger } from '../../lib/logger/logger';
import { User } from '../dtos/user.dto';
import { UserDocument, UserModel } from '../schemas/user.schema';

export class UserRepository {
  private static instance: UserRepository;
  private userModel: Model<UserDocument> = UserModel;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): UserRepository {
    if (!this.instance) {
      this.instance = new UserRepository();
    }
    return this.instance;
  }

  public getUsers() {
    logger.info({
      context: UserRepository.name,
      message: 'Retrieving all users',
    });
    return this.userModel.find({});
  }

  public getUser(id: ObjectId) {
    logger.info({
      context: UserRepository.name,
      message: `Retrieving user with id ${id}`,
    });
    return this.userModel.findById(id);
  }

  public createUser(user: User) {
    logger.info({
      context: UserRepository.name,
      message: 'Creating user',
      user,
    });
    return this.userModel.create(user);
  }

  public updateUser(id: ObjectId, user: User) {
    logger.info({
      context: UserRepository.name,
      message: `Updating user with id ${id}`,
      user,
    });
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  public deleteUser(id: ObjectId) {
    logger.info({
      context: UserRepository.name,
      message: `Deleting user with id ${id}`,
    });
    return this.userModel.findByIdAndDelete(id);
  }
}
