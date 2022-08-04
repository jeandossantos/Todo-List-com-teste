import { User } from '../../entities/User';
import TaskRepositoryInMemory from '../../repositories/InMemory/TaskRepositoryInMemory';
import { UserRepositoryInMemory } from '../../repositories/InMemory/UserRepositoryInMemory';
import { CreateTaskUseCase } from './CreateTaskUseCase';

const taskRepository = new TaskRepositoryInMemory();
const userRepository = new UserRepositoryInMemory();
const createTaskUseCase = new CreateTaskUseCase(taskRepository);
let user: User;

beforeEach(async () => {
  taskRepository.items = [];

  user = await userRepository.create({
    name: 'create task test unit',
    email: 'testecreateTask@test.com',
    initials: 'CT',
    password: '40028922',
  });
});

describe('Create Task', () => {
  it('Should be able to create a new task', async () => {
    const task = {
      name: 'Tarefa de Teste',
      description: 'Testando a criação de tarefa',
      deadline: new Date(),
      done: true,
      userId: user.id,
    };

    const response = await createTaskUseCase.execute(task);

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('createdAt');
  });

  it('Should be able to create a new task without a description', async () => {
    const task = {
      name: 'Tarefa de Teste',
      description: '',
      deadline: new Date(),
      done: true,
      userId: user.id,
    };

    const response = await createTaskUseCase.execute(task);

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('createdAt');
  });

  it('Should be able to create a new task without a deadline', async () => {
    const task = {
      name: 'Tarefa de Teste',
      description: '',
      done: true,
      userId: user.id,
    };

    const response = await createTaskUseCase.execute(task);

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('createdAt');
  });

  it('Should be able to create a new task without a done', async () => {
    const task = {
      name: 'Tarefa de Teste',
      description: 'Testando done',
      userId: user.id,
    };

    const response = await createTaskUseCase.execute(task);

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('createdAt');
  });

  it('Should not be able to create a new task without a name', async () => {
    const task = {
      name: '',
      description: '',
      deadline: new Date(),
      done: true,
      userId: user.id,
    };

    const response = createTaskUseCase.execute(task);

    await expect(response).rejects.toEqual(new Error('Name is required!'));
  });

  it('Should not be able to create a new task without a user ID', async () => {
    const task = {
      name: '',
      description: '',
      deadline: new Date(),
      done: true,
      userId: '',
    };

    const response = createTaskUseCase.execute(task);

    await expect(response).rejects.toEqual(new Error('User ID is required!'));
  });
});
