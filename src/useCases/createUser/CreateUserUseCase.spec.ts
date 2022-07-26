import { UserRepositoryInMemory } from '../../repositories/InMemory/UserRepositoryInMemory';
import { IUserRepository } from '../../repositories/userRepository/IUserRepository';
import { CreateUserUseCase } from './CreateUserUseCase';

describe('Create User', () => {
  let userRepository: IUserRepository & { clearItems: () => void };
  let createUserUseCase: CreateUserUseCase;

  userRepository = new UserRepositoryInMemory();
  createUserUseCase = new CreateUserUseCase(userRepository);

  beforeEach(() => userRepository.clearItems());

  it('should be able to create a new user', async () => {
    const userData = {
      name: 'Teste',
      email: 'testando@gmail.com',
      initials: 'TT',
      password: '40028922',
      confirmPassword: '40028922',
    };

    const response = await createUserUseCase.execute(userData);

    expect(response).toHaveProperty(['id']);
    expect(response.email).toBe(userData.email);
  });

  it('should not be able to create an existing user', async () => {
    const userData = {
      name: 'Teste',
      email: 'testando2@gmail.com',
      initials: 'TT',
      password: '40028922',
      confirmPassword: '40028922',
    };

    await createUserUseCase.execute(userData);

    await expect(createUserUseCase.execute(userData)).rejects.toEqual(
      new Error('User already exists!')
    );
  });

  it('should not be able to create a new user without a name', async () => {
    const userData = {
      name: '',
      email: 'testando@gmail.com',
      initials: 'TT',
      password: '40028922',
      confirmPassword: '40028922',
    };

    await expect(createUserUseCase.execute(userData)).rejects.toEqual(
      new Error('The name is required!')
    );
  });

  it('should not be able to create a new user with an invalid e-mail', async () => {
    const userData = {
      name: 'Testa da Silva',
      email: 'teste_gmail.com',
      initials: 'TT',
      password: '40028922',
      confirmPassword: '40028922',
    };

    await expect(createUserUseCase.execute(userData)).rejects.toEqual(
      new Error('Invalid e-mail!')
    );
  });

  it('should not be able to create a new user without initials', async () => {
    const userData = {
      name: 'Teste da Silva',
      email: 'testando@gmail.com',
      initials: 'T',
      password: '40028922',
      confirmPassword: '40028922',
    };

    await expect(createUserUseCase.execute(userData)).rejects.toEqual(
      new Error('The initials must have at least 2 characters!')
    );
  });

  it('should not be able to create a new user with invalid initials', async () => {
    const userData = {
      name: 'Teste da Silva',
      email: 'testando@gmail.com',
      initials: 'T5',
      password: '40028922',
      confirmPassword: '40028922',
    };

    await expect(createUserUseCase.execute(userData)).rejects.toEqual(
      new Error('The initials must not contain numbers!')
    );
  });

  it('should not be able to create a new user if the passwords do not match', async () => {
    const userData = {
      name: 'Teste da Silva',
      email: 'testando@gmail.com',
      initials: 'TS',
      password: '40028922',
      confirmPassword: '40028922teste',
    };

    await expect(createUserUseCase.execute(userData)).rejects.toEqual(
      new Error('The passwords do not match!')
    );
  });

  it('should not be able to create a new user if the password does not have at least 8 characters', async () => {
    const userData = {
      name: 'Teste da Silva',
      email: 'testando@gmail.com',
      initials: 'TS',
      password: '400289',
      confirmPassword: '400289',
    };

    await expect(createUserUseCase.execute(userData)).rejects.toEqual(
      new Error('The password must have at least 8 characters!')
    );
  });
});
