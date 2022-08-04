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
let tasks: Task[] = [];
const userRepository = new UserRepository();
const taskRepository = new TaskRepository();

beforeAll(async () => {
  await client.connect();
  await client.query('delete from users');
  await client.end();

  user = await userRepository.create({
    name: 'CreateTaskTest@test.com',
    initials: 'TC',
    email: 'findtasksByName@test.com',
    password: '40028922',
  });

  tasks.push(
    { name: 'My task 1', userId: user.id },
    { name: 'My task 2', userId: user.id },
    { name: 'My task 3', userId: user.id },
    { name: 'My task 4', userId: user.id },
    { name: 'My task 5', userId: user.id },
    { name: 'My task 6', userId: user.id },
    { name: 'My task 7', userId: user.id },
    { name: 'My task 8', userId: user.id }
  );

  await taskRepository.create(tasks[0]);
  await taskRepository.create(tasks[1]);
  await taskRepository.create(tasks[2]);
  await taskRepository.create(tasks[3]);
  await taskRepository.create(tasks[4]);
  await taskRepository.create(tasks[5]);
  await taskRepository.create(tasks[6]);
  await taskRepository.create(tasks[7]);
});

describe('Find tasks by name', () => {
  it('should be able to find tasks', async () => {
    const response = await request(app).get('/tasks').send({
      userId: user.id,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('tasks');
    expect(response.body).toHaveProperty('count');
    expect(response.body).toHaveProperty('limit');
    expect(response.body.count).toBe(8);
  });

  it('should be able to find tasks by name', async () => {
    const response = await request(app)
      .get(`/tasks?search=${tasks[3].name}`)
      .send({
        userId: user.id,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('tasks');
    expect(response.body).toHaveProperty('count');
    expect(response.body).toHaveProperty('limit');
    expect(response.body.count).toBe(8);
    expect(response.body.tasks[0].name).toBe(tasks[3].name);
  });

  it('should be able to paginate tasks', async () => {
    const response = await request(app).get(`/tasks?page=2`).send({
      userId: user.id,
    });

    expect(response.status).toBe(200);
    expect(response.body.count).toBe(8);
    expect(response.body).toHaveProperty('tasks');
    expect(response.body).toHaveProperty('count');
    expect(response.body).toHaveProperty('limit');
    expect(response.body.tasks[0].name).toBe('My task 4');
    expect(response.body.tasks[1].name).toBe('My task 3');
    expect(response.body.tasks[2].name).toBe('My task 2');
    expect(response.body.tasks[3].name).toBe('My task 1');
  });
});
