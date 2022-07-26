import { Task } from '../../entities/Task';
import { User } from '../../entities/User';
import TaskRepositoryInMemory from '../../repositories/InMemory/TaskRepositoryInMemory';
import { UserRepositoryInMemory } from '../../repositories/InMemory/UserRepositoryInMemory';
import { RemoveTaskUseCase } from './RemoveTaskUseCase';

const userRepository = new UserRepositoryInMemory();
const taskRepository = new TaskRepositoryInMemory();
const removeTaskUseCase = new RemoveTaskUseCase(taskRepository);

let user: User;
let task: Task;

beforeAll(async () => {
  user = await userRepository.create({
    name: 'Teste removeTask',
    email: 'testeDeleteTask@teste.com',
    initials: 'TR',
    password: '70707070',
  });

  task = await taskRepository.create({
    name: 'Remove Task',
    userId: user.id,
    description: 'removing a task',
  });
});

describe('Remove Task', () => {
  it('Should be able to remove a task', async () => {
    const response = await removeTaskUseCase.execute(task.id);

    expect(response.id).toBe(task.id);
  });

  it('Should not be able to remove a task without task ID', async () => {
    const response = removeTaskUseCase.execute('');

    await expect(response).rejects.toThrowError(
      new Error('Task Id is required!')
    );
  });
});
