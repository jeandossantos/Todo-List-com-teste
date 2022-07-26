import { IUserRepository } from '../../repositories/userRepository/IUserRepository';
import { encryptPassword } from '../../utils/helpers';
import {
  equalsOrError,
  existsOrError,
  validateEmail,
} from '../../utils/validators';
import { CreateUserDTO } from './CreateUserDTO';

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    name,
    initials,
    email,
    password,
    confirmPassword,
  }: CreateUserDTO) {
    existsOrError(name, 'The name is required!');
    validateEmail(email, 'Invalid e-mail!');

    if (initials.trim().length !== 2) {
      throw new Error('The initials must have at least 2 characters!');
    }

    const regex = new RegExp(/[0-9]/);

    if (regex.test(initials.trim())) {
      throw new Error('The initials must not contain numbers!');
    }

    if (password.length < 8) {
      throw new Error('The password must have at least 8 characters!');
    }

    equalsOrError(password, confirmPassword, 'The passwords do not match!');

    if (await this.userRepository.exists(email)) {
      throw new Error('User already exists!');
    }

    const encryptedPassword = encryptPassword(password);

    const newUser = await this.userRepository.create({
      name,
      initials,
      email,
      password: encryptedPassword,
    });

    return newUser;
  }
}
