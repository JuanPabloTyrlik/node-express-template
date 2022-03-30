import { model, Schema } from 'mongoose';
import { USER_MODEL_NAME } from '../constants';
import { User } from '../dtos/user.dto';

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

export type UserDocument = User & Document;

export const UserModel = model(USER_MODEL_NAME, UserSchema);
