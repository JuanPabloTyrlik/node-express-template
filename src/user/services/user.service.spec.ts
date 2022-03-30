/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from 'bson';
import { User } from '../dtos/user.dto';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from './user.service';

describe(UserService.name, () => {
  const service = UserService.getInstance();
  const repository = UserRepository.getInstance();

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updateUser', () => {
    const id = new ObjectId();
    const mockUser: User = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };

    it('should call userRepository.updateUser with the correct parameters', async () => {
      const updateUserSpy = jest
        .spyOn(repository, 'updateUser')
        .mockResolvedValueOnce(mockUser as any);

      await service.updateUser(id, mockUser);

      expect(updateUserSpy).toHaveBeenCalledWith(id, mockUser);
    });

    it('should throw UserNotFoundException', () => {
      jest.spyOn(repository, 'updateUser').mockResolvedValueOnce(null);

      const promise = service.updateUser(id, mockUser);

      return expect(promise).rejects.toBeInstanceOf(UserNotFoundException);
    });
  });
});
