/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from 'bson';
import { User } from '../dtos/user.dto';
import { UserRepository } from '../repositories/user.repository';
import { UserModel } from '../schemas/user.schema';

jest.mock('../schemas/user.schema');

describe(UserRepository.name, () => {
  const repository = UserRepository.getInstance();

  const userId = new ObjectId();
  const userMock: User = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
  };

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('getUsers', () => {
    it('should call repository.find', async () => {
      await repository.getUsers();

      expect(UserModel.find).toHaveBeenCalledWith({});
    });
  });

  describe('getUser', () => {
    it('should call repository.findById', async () => {
      await repository.getUser(userId);

      expect(UserModel.findById).toHaveBeenCalledWith(userId);
    });
  });

  describe('createUser', () => {
    it('should call repository.create', async () => {
      await repository.createUser(userMock);

      expect(UserModel.create).toHaveBeenCalledWith(userMock);
    });
  });

  describe('updateUser', () => {
    it('should call repository.findByIdAndUpdate', async () => {
      await repository.updateUser(userId, userMock);

      expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(
        userId,
        userMock,
        { new: true }
      );
    });
  });

  describe('deleteUser', () => {
    it('should call repository.findByIdAndDelete', async () => {
      await repository.deleteUser(userId);

      expect(UserModel.findByIdAndDelete).toHaveBeenCalledWith(userId);
    });
  });
});
