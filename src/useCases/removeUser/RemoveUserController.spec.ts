import app from '../../app';
import request from 'supertest';
import { UserRepository } from '../../repositories/userRepository/UserRepository';
import { Client } from 'pg';
import { User } from '../../entities/User';

let user: User;
const userRepository = new UserRepository();
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

beforeAll(async () => {
  await client.connect();
  await client.query('delete from users');
  await client.end();

  user = await userRepository.create({
    name: 'Teste remove',
    email: 'removeUser@gmail.com',
    initials: 'TR',
    password: '40028922',
  });
});

describe('Remove User', () => {
  it('should be able to remove a user', async () => {
    const response = await request(app).delete(`/users/${user.id}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to delete a user with invalid ID', async () => {
    const userId = 'ID:FAKE';

    const response = await request(app).delete(`/users/${userId}`);

    expect(response.status).toBe(400);
  });
});
