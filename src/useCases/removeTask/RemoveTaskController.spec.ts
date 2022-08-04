import app from '../../app';
import request from 'supertest';
import { Client } from 'pg';

import { User } from '../../entities/User';
import { UserRepository } from '../../repositories/userRepository/UserRepository';
import { TaskRepository } from '../../repositories/taskRepository/TaskRepository';
import { Task } from '../../entities/Task';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

let task: Task;

const userRepository = new UserRepository();
const taskRepository = new TaskRepository();
beforeAll(async () => {
  await client.connect();
  await client.query('delete from users');
  await client.end();

  const user: User = await userRepository.create({
    name: 'CreateTaskTest@test.com',
    initials: 'TC',
    email: 'aaacreateTask@test.com',
    password: '40028922',
  });

  task = await taskRepository.create({
    userId: user.id,
    name: 'Test delete task',
  });
});

describe('Remove Task', () => {
  it('Should be able to remove a user', async () => {
    const response = await request(app).delete(`/tasks/${task.id}`);

    expect(response.status).toEqual(200);
  });
});
