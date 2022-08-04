import app from '../../app';
import request from 'supertest';
import { UserRepository } from '../../repositories/userRepository/UserRepository';
import { Client } from 'pg';
import { User } from '../../entities/User';
import { Task } from '../../entities/Task';
import { TaskRepository } from '../../repositories/taskRepository/TaskRepository';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

let user: User;
let task: Task;
const userRepository = new UserRepository();
const taskRepository = new TaskRepository();

beforeAll(async () => {
  await client.connect();
  await client.query('delete from users');
  await client.end();

  user = await userRepository.create({
    name: 'CreateTaskTest@test.com',
    initials: 'TC',
    email: 'updateTask@test.com',
    password: '40028922',
  });

  task = await taskRepository.create({
    name: 'test update task',
    userId: user.id,
  });
});

describe('Update Task', () => {
  it('should be able to update a task', async () => {
    const response = await request(app).put(`/tasks/${task.id}`).send({
      name: 'updated task',
      description: 'This task must be updated.',
      deadline: new Date(),
      done: true,
    });

    expect(response.status).toBe(200);
  });

  it('should be able to update a task without a description', async () => {
    const response = await request(app).put(`/tasks/${task.id}`).send({
      name: 'updated task without a description',
      deadline: new Date(),
      done: true,
    });

    expect(response.status).toBe(200);
  });

  it('should be able to update a task without a deadline', async () => {
    const response = await request(app).put(`/tasks/${task.id}`).send({
      name: 'updated task without a description',
      description: 'Some description',
      //deadline: new Date(),
      done: true,
    });

    expect(response.status).toBe(200);
  });

  it('should be able to update a task without a deadline', async () => {
    const response = await request(app).put(`/tasks/${task.id}`).send({
      name: 'updated task without a description',
      description: 'Some description',
      deadline: new Date(),
      //done: true,
    });

    expect(response.status).toBe(200);
  });

  it('should not be able to update a task without a name', async () => {
    const response = await request(app).put(`/tasks/${task.id}`).send({
      //name: 'updated task without a description',
      description: 'Some description',
      deadline: new Date(),
      done: true,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Name is required!');
  });
});
