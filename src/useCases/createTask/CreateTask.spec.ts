import { Task } from '../../entities/Task';
import TaskRepositoryInMemory from '../../repositories/InMemory/TaskRepositoryInMemory';
import { CreateTaskUseCase } from './CreateTaskUseCase';

const taskRepository = new TaskRepositoryInMemory();
const createTaskUseCase = new CreateTaskUseCase(taskRepository);

beforeEach(() => (taskRepository.items = []));

describe('Create Task', () => {
  it('Should be able to create a new task', async () => {
    const task = {
      name: 'Tarefa de Teste',
      description: 'Testando a criação de tarefa',
      deadline: new Date(),
      done: true,
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
    };

    const response = await createTaskUseCase.execute(task);

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('createdAt');
  });

  it('Should be able to create a new task without a done', async () => {
    const task = {
      name: 'Tarefa de Teste',
      description: 'Testando done',
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
    };

    const response = createTaskUseCase.execute(task);

    await expect(response).rejects.toEqual(new Error('Name is required!'));
  });
});
