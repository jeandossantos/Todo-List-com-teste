import { UserRepositoryInMemory } from '../../repositories/InMemory/UserRepositoryInMemory';
import { IUserRepository } from '../../repositories/userRepository/IUserRepository';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { RemoveUserUseCase } from './RemoveUserUseCase';

let userRepository: IUserRepository;
let removeUserUseCase: RemoveUserUseCase;
let createUserUseCase: CreateUserUseCase;

userRepository = new UserRepositoryInMemory();
createUserUseCase = new CreateUserUseCase(userRepository);
removeUserUseCase = new RemoveUserUseCase(userRepository);

describe('Remove User', () => {
  it('should be able to delete a user', async () => {
    const userData = {
      name: 'Teste',
      email: 'testando@gmail.com',
      initials: 'TT',
      password: '40028922',
      confirmPassword: '40028922',
    };

    const newUser = await createUserUseCase.execute(userData);

    const deletedUser = await removeUserUseCase.execute(newUser.id);

    expect(deletedUser).toHaveProperty('id');
    expect(deletedUser.email).toBe(userData.email);
  });

  it('should not be able to delete a user without ID', async () => {
    await expect(removeUserUseCase.execute('')).rejects.toEqual(
      new Error('User not exists!')
    );
  });

  it('should not be able to delete a nonexistent user', async () => {
    await expect(removeUserUseCase.execute('ID::FAKE')).rejects.toEqual(
      new Error('User not exists!')
    );
  });
});
