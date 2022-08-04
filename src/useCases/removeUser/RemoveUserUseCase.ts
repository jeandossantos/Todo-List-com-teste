import { CustomException } from '../../exceptions/CustomException';
import { IUserRepository } from '../../repositories/userRepository/IUserRepository';

export class RemoveUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string) {
    if (!userId) {
      throw new Error('User not exists!');
    }

    const userExists = await this.userRepository.findById(userId);

    if (!userExists) {
      throw new CustomException('User not exists!');
    }

    const user = await this.userRepository.remove(userId);

    return user;
  }
}
