import app from '../../app';
import request from 'supertest';
import { UserRepository } from '../../repositories/userRepository/UserRepository';
import { Client } from 'pg';
import { User } from '../../entities/User';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

let user: User;
const userRepository = new UserRepository();

beforeAll(async () => {
  await client.connect();
  await client.query('delete from users');
  await client.end();

  user = await userRepository.create({
    name: 'CreateTaskTest@test.com',
    initials: 'TC',
    email: 'createTask@test.com',
    password: '40028922',
  });
});

describe('Create Task', () => {
  it('should be able to create a new task', async () => {
    const taskData = {
      name: 'Create Task Test',
      description: 'Testing create task',
      done: true,
      deadline: new Date(),
      userId: user.id,
    };

    const response = await request(app)
      .post('/tasks')
      .send({
        ...taskData,
      });

    expect(response.status).toBe(200);
  });

  it('should be able to create a new task without a description', async () => {
    const taskData = {
      name: 'Create Task Test',
      description: 'Testing create task',
      done: true,
      deadline: new Date(),
      userId: user.id,
    };

    const response = await request(app)
      .post('/tasks')
      .send({
        ...taskData,
        description: '',
      });

    expect(response.status).toBe(200);
  });

  it('should be able to create a new task without a deadline', async () => {
    const taskData = {
      name: 'Create Task Test',
      description: 'Testing create task',
      done: true,
      userId: user.id,
    };

    const response = await request(app)
      .post('/tasks')
      .send({
        ...taskData,
      });

    expect(response.status).toBe(200);
  });

  it('should be able to create a new task without a done', async () => {
    const taskData = {
      name: 'Create Task Test',
      description: 'Testing create task',
      userId: user.id,
    };

    const response = await request(app)
      .post('/tasks')
      .send({
        ...taskData,
      });

    expect(response.status).toBe(200);
  });

  it('should not be able to create a new task without a name', async () => {
    const taskData = {
      description: 'Testing create task',
      userId: user.id,
    };

    const response = await request(app)
      .post('/tasks')
      .send({
        ...taskData,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Name is required!');
  });

  it('should not be able to create a new task without a user ID', async () => {
    const taskData = {
      name: 'Test create Task',
      description: 'Testing create task',
      // userId: user.id,
    };

    const response = await request(app)
      .post('/tasks')
      .send({
        ...taskData,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User ID is required!');
  });
});
