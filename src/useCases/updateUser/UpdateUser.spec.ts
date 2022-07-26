import { UserRepositoryInMemory } from '../../repositories/InMemory/UserRepositoryInMemory';
import { UpdateUserUseCase } from './UpdateUserUseCase';

let updateUserUseCase: UpdateUserUseCase;

let userRepository = new UserRepositoryInMemory();
updateUserUseCase = new UpdateUserUseCase(userRepository);

beforeEach(() => userRepository.clearItems());

describe('Update User', () => {
  it('should be able to update a user', async () => {
    const userData = {
      name: 'Teste Da Silva',
      email: 'testando@gmail.com',
      initials: 'TS',
      password: '40028922',
      confirmPassword: '40028922',
    };

    const name = 'Testando Update';
    const initials = 'TU';

    const newUser = await userRepository.create(userData);

    await updateUserUseCase.execute(newUser.id, name, initials);

    const response = await userRepository.findById(newUser.id);

    expect(response.name).toBe(name);
    expect(response.initials).toBe(initials);
  });

  it('should not be able to update a new user without a name', async () => {
    const userData = {
      name: 'Teste Da Silva',
      email: 'testando@gmail.com',
      initials: 'TS',
      password: '40028922',
      confirmPassword: '40028922',
    };

    const name = '';
    const initials = 'TU';

    const newUser = await userRepository.create(userData);

    await expect(
      updateUserUseCase.execute(newUser.id, name, initials)
    ).rejects.toEqual(new Error('The name is required!'));
  });

  it('should not be able to update a new user without initials', async () => {
    const userData = {
      name: 'Teste da Silva',
      email: 'testando@gmail.com',
      initials: 'TS',
      password: '40028922',
      confirmPassword: '40028922',
    };

    const newUser = await userRepository.create(userData);

    const name = 'Testando Update';
    const initials = 'T';

    await expect(
      updateUserUseCase.execute(newUser.id, name, initials)
    ).rejects.toEqual(
      new Error('The initials must have at least 2 characters!')
    );
  });

  it('should not be able to create a new user with invalid initials', async () => {
    const userData = {
      name: 'Teste da Silva',
      email: 'testando@gmail.com',
      initials: 'TS',
      password: '40028922',
      confirmPassword: '40028922',
    };

    const newUser = await userRepository.create(userData);

    const name = 'Testando Update';
    const initials = 'T5';

    await expect(
      updateUserUseCase.execute(newUser.id, name, initials)
    ).rejects.toEqual(new Error('The initials must not contain numbers!'));
  });
});
