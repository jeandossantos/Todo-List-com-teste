import { Task } from '../../entities/Task';
import { User } from '../../entities/User';
import TaskRepositoryInMemory from '../../repositories/InMemory/TaskRepositoryInMemory';
import { UserRepositoryInMemory } from '../../repositories/InMemory/UserRepositoryInMemory';
import { UpdateTaskUseCase } from './UpdateTaskUseCase';

const taskRepository = new TaskRepositoryInMemory();
const userRepository = new UserRepositoryInMemory();
const updateTask = new UpdateTaskUseCase(taskRepository);

let task: Task;
let user: User;

beforeAll(async () => {
  const userData: User = {
    name: 'User Teste',
    email: 'testandoUpdateTask@teste.com',
    initials: 'UT',
    password: '40028922',
  };

  user = await userRepository.create(userData);

  const taskData: Task = {
    name: 'Create Task',
    description: 'No description',
    done: false,
    userId: user.id,
  };

  task = await taskRepository.create(taskData);
});

describe('Update Task', () => {
  it('Should be able to update a task', async () => {
    const taskData = {
      id: task.id,
      userId: user.id,
      name: 'Update Task',
      description: 'Some description',
      done: true,
    };

    const response = await updateTask.execute(taskData);

    expect(response.name).toBe(taskData.name);
    expect(response.description).toBe(taskData.description);
    expect(response.done).toBe(taskData.done);
  });

  it('Should not be able to update without a name', async () => {
    const taskData = {
      id: task.id,
      userId: user.id,
      name: '',
      description: 'Some description',
      done: true,
    };

    const response = updateTask.execute(taskData);

    expect(response).rejects.toThrowError(new Error('Name is required!'));
  });

  it('Should not be able to update without a task ID', async () => {
    const taskData = {
      id: '',
      userId: user.id,
      name: 'Update without a id',
      description: 'Some description',
      done: true,
    };

    const response = updateTask.execute(taskData);

    expect(response).rejects.toThrowError(new Error('Task ID is required!'));
  });

  it('Should not be able to update without a task ID', async () => {
    const taskData = {
      id: task.id,
      userId: '',
      name: 'Update without a user id',
      description: 'Some description',
      done: true,
    };

    const response = updateTask.execute(taskData);

    expect(response).rejects.toThrowError(new Error('User ID is required!'));
  });
});
