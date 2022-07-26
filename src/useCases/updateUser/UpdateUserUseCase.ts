import { IUserRepository } from '../../repositories/userRepository/IUserRepository';
import { existsOrError } from '../../utils/validators';

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string, name: string, initials: string) {
    existsOrError(name, 'The name is required!');

    if (initials.trim().length !== 2) {
      throw new Error('The initials must have at least 2 characters!');
    }

    const regex = new RegExp(/[0-9]/);

    if (regex.test(initials.trim())) {
      throw new Error('The initials must not contain numbers!');
    }

    const user = await this.userRepository.findById(userId);

    existsOrError(user, 'User not found!');

    await this.userRepository.update(userId, name, initials);
  }
}
