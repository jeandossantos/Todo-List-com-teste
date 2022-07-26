import { Task } from '../../entities/Task';
import { User } from '../../entities/User';
import TaskRepositoryInMemory from '../../repositories/InMemory/TaskRepositoryInMemory';
import { UserRepositoryInMemory } from '../../repositories/InMemory/UserRepositoryInMemory';
import FindTasksByNameUseCase from './FindTasksByNameUseCase';

const taskRepository = new TaskRepositoryInMemory();
const userRepository = new UserRepositoryInMemory();
const findTasksByNameUseCase = new FindTasksByNameUseCase(taskRepository);

//beforeEach(() => (taskRepository.items = []));
let user: User;
let tasks: Task[];

beforeAll(async () => {
  const userData = {
    name: 'Teste da Silva',
    initials: 'TS',
    email: 'testando@test.com',
    password: '40028922',
    confirmPassword: '40028922',
  };

  user = await userRepository.create(userData);

  for (let i = 0; i < 10; i++) {
    const task = {
      userId: user.id,
      name: 'Task - ' + i,
      description: 'Essa é a task ' + i,
      done: i % 2 === 0 ? true : false,
    };

    taskRepository.create(task);
  }
});

describe('Find tasks by name', () => {
  it('Should be able to find tasks by name', async () => {
    const response = await findTasksByNameUseCase.execute(user.id, 'Task - 1');

    expect(response).toHaveProperty('tasks');
    expect(response).toHaveProperty('count');
    expect(response).toHaveProperty('limit');
  });

  it('Should be able to find tasks by name without the search argument', async () => {
    const response = await findTasksByNameUseCase.execute(user.id);

    expect(response).toHaveProperty('tasks');
    expect(response).toHaveProperty('count');
    expect(response).toHaveProperty('limit');
  });

  it('Should not be able to find tasks by name without a user ID', async () => {
    const response = findTasksByNameUseCase.execute('', 'Task - 1');

    expect(response).rejects.toThrowError(new Error('User ID is required!'));
  });
});
