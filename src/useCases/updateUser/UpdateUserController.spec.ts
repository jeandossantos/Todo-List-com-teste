import app from '../../app';
import request from 'supertest';
import { UserRepository } from '../../repositories/userRepository/UserRepository';
import { Client } from 'pg';

const userRepository = new UserRepository();
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

beforeAll(async () => {
  await client.connect();
  await client.query('delete from users');
  await client.end();
});

describe('Update User', () => {
  it('should be able to update a user', async () => {
    const userData = {
      name: 'Update User',
      email: 'updateUser@gmail.com',
      initials: 'UU',
      password: '40028922',
    };

    const user = await userRepository.create(userData);

    const response = await request(app).put(`/users/${user.id}`).send({
      name: 'Updated User',
      initials: 'TU',
    });

    expect(response.status).toBe(200);
  });

  it('should not be able to update a new user without a name', async () => {
    const userId = 'Fake::ID';

    const response = await request(app).put(`/users/${userId}`).send({
      name: '',
      initials: 'TU',
    });

    expect(response.status).toBe(400);
  });

  it('should not be able to update a new user without initials', async () => {
    const userId = 'Fake::ID';

    const response = await request(app).put(`/users/${userId}`).send({
      name: 'Updated User',
      initials: '',
    });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a new user with invalid initials', async () => {
    const userId = 'Fake::ID';

    const response = await request(app).put(`/users/${userId}`).send({
      name: 'Updated User',
      initials: 'T3',
    });

    expect(response.status).toBe(400);
  });
});
