/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from 'bson';
import { User } from '../dtos/user.dto';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from './user.service';

describe(UserService.name, () => {
  const service = UserService.getInstance();
  const repository = UserRepository.getInstance();

  const userId = new ObjectId();
  const mockUser: User = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUsers', () => {
    it('should call repository.getUsers', async () => {
      const getUsersSpy = jest
        .spyOn(repository, 'getUsers')
        .mockResolvedValueOnce([mockUser] as any);

      const users = await service.getUsers();

      expect(getUsersSpy).toHaveBeenCalled();
      expect(users).toEqual([mockUser]);
    });

    it('should re-throw unknown errors', () => {
      jest
        .spyOn(repository, 'getUsers')
        .mockRejectedValueOnce(new Error('test'));

      const promise = service.getUsers();

      return expect(promise).rejects.toEqual(new Error('test'));
    });
  });

  describe('getUser', () => {
    it('should call repository.getUser', async () => {
      const getUserSpy = jest
        .spyOn(repository, 'getUser')
        .mockResolvedValueOnce(mockUser as any);

      const user = await service.getUser(userId);

      expect(getUserSpy).toHaveBeenCalledWith(userId);
      expect(user).toEqual(mockUser);
    });

    it('should throw UserNotFoundException', () => {
      jest.spyOn(repository, 'getUser').mockResolvedValueOnce(null);

      const promise = service.getUser(userId);

      return expect(promise).rejects.toBeInstanceOf(UserNotFoundException);
    });

    it('should re-throw unknown errors', () => {
      jest
        .spyOn(repository, 'getUser')
        .mockRejectedValueOnce(new Error('test'));

      const promise = service.getUser(userId);

      return expect(promise).rejects.toEqual(new Error('test'));
    });
  });

  describe('createUser', () => {
    it('should call repository.createUser', async () => {
      const createUserSpy = jest
        .spyOn(repository, 'createUser')
        .mockResolvedValueOnce(mockUser as any);

      const user = await service.createUser(mockUser);

      expect(createUserSpy).toHaveBeenCalledWith(mockUser);
      expect(user).toEqual(mockUser);
    });

    it('should re-throw unknown errors', () => {
      jest
        .spyOn(repository, 'createUser')
        .mockRejectedValueOnce(new Error('test'));

      const promise = service.createUser(mockUser);

      return expect(promise).rejects.toEqual(new Error('test'));
    });
  });

  describe('updateUser', () => {
    it('should call userRepository.updateUser', async () => {
      const updateUserSpy = jest
        .spyOn(repository, 'updateUser')
        .mockResolvedValueOnce(mockUser as any);

      await service.updateUser(userId, mockUser);

      expect(updateUserSpy).toHaveBeenCalledWith(userId, mockUser);
    });

    it('should throw UserNotFoundException', () => {
      jest.spyOn(repository, 'updateUser').mockResolvedValueOnce(null);

      const promise = service.updateUser(userId, mockUser);

      return expect(promise).rejects.toBeInstanceOf(UserNotFoundException);
    });

    it('should re-throw unknown errors', () => {
      jest
        .spyOn(repository, 'updateUser')
        .mockRejectedValueOnce(new Error('test'));

      const promise = service.updateUser(userId, mockUser);

      return expect(promise).rejects.toEqual(new Error('test'));
    });
  });

  describe('deleteUser', () => {
    it('should call userRepository.deleteUser', async () => {
      const deleteUserSpy = jest
        .spyOn(repository, 'deleteUser')
        .mockResolvedValueOnce(mockUser as any);

      await service.deleteUser(userId);

      expect(deleteUserSpy).toHaveBeenCalledWith(userId);
    });

    it('should throw UserNotFoundException', () => {
      jest.spyOn(repository, 'deleteUser').mockResolvedValueOnce(null);

      const promise = service.deleteUser(userId);

      return expect(promise).rejects.toBeInstanceOf(UserNotFoundException);
    });

    it('should re-throw unknown errors', () => {
      jest
        .spyOn(repository, 'deleteUser')
        .mockRejectedValueOnce(new Error('test'));

      const promise = service.deleteUser(userId);

      return expect(promise).rejects.toEqual(new Error('test'));
    });
  });
});
