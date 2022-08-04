import 'dotenv/config';

import { UserRepositoryInMemory } from '../../repositories/InMemory/UserRepositoryInMemory';
import { IUserRepository } from '../../repositories/userRepository/IUserRepository';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let userRepository: IUserRepository & { clearItems };
let authenticateUserUseCase: AuthenticateUserUseCase;

userRepository = new UserRepositoryInMemory();
authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);

beforeEach(() => userRepository.clearItems());

describe('Authenticate User', () => {
  const userData = {
    name: 'Teste',
    email: 'testando@gmail.com',
    initials: 'TT',
    password: '40028922',
    confirmPassword: '40028922',
  };

  it('should be able to authenticate a user', async () => {
    const email = userData.email;
    const password = userData.password;

    await new CreateUserUseCase(userRepository).execute(userData);

    const result = await authenticateUserUseCase.execute(email, password);

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate without an email', async () => {
    const email = '';
    const password = userData.password;

    await new CreateUserUseCase(userRepository).execute(userData);

    await expect(
      authenticateUserUseCase.execute(email, password)
    ).rejects.toEqual(new Error('Enter E-mail and password!'));
  });

  it('should not be able to authenticate without a password', async () => {
    const email = userData.email;
    const password = '';

    await new CreateUserUseCase(userRepository).execute(userData);

    await expect(
      authenticateUserUseCase.execute(email, password)
    ).rejects.toEqual(new Error('Enter E-mail and password!'));
  });

  it('should not be able to authenticate with an  unregistered email', async () => {
    const email = 'unregisteredEmail@teste.com';
    const password = userData.password;

    await expect(
      authenticateUserUseCase.execute(email, password)
    ).rejects.toEqual(new Error('E-mail not registered!'));
  });

  it('should not be able to authenticate with an incorrect password', async () => {
    const email = userData.email;
    const password = '40028922teste';

    await new CreateUserUseCase(userRepository).execute(userData);

    await expect(
      authenticateUserUseCase.execute(email, password)
    ).rejects.toEqual(new Error('E-mail and/or password invalid.'));
  });
});
