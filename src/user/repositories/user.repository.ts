import { ObjectId } from 'bson';
import { Model } from 'mongoose';
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
    return this.userModel.find({});
  }

  public getUser(id: ObjectId) {
    return this.userModel.findById(id);
  }

  public createUser(user: User) {
    return this.userModel.create(user);
  }

  public updateUser(id: ObjectId, user: User) {
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  public deleteUser(id: ObjectId) {
    return this.userModel.findByIdAndDelete(id);
  }
}
