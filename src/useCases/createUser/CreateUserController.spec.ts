import app from '../../app';
import request from 'supertest';
import { UserRepository } from '../../repositories/userRepository/UserRepository';
import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

beforeAll(async () => {
  await client.connect();
  await client.query('delete from users');
  await client.end();
});

const userRepository = new UserRepository();

describe('Create User', () => {
  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'Teste',
      email: 'testando@gmail.com',
      initials: 'TT',
      password: '40028922',
      confirmPassword: '40028922',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Should not be able to create an existing user', async () => {
    const userData = {
      name: 'Teste',
      email: 'existingUser@gmail.com',
      initials: 'TT',
      password: '40028922',
    };

    await userRepository.create(userData);

    const response = await request(app)
      .post('/users')
      .send({
        ...userData,
        confirmPassword: '40028922',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('Should not be able to create a new user user without a name', async () => {
    const userData = {
      name: '',
      email: 'existingUser@gmail.com',
      initials: 'TT',
      password: '40028922',
    };

    const response = await request(app)
      .post('/users')
      .send({
        ...userData,
        confirmPassword: '40028922',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should not be able to create a new user with an invalid e-mail', async () => {
    const userData = {
      name: 'Teste email',
      email: 'invalidEmailGmail.com',
      initials: 'TT',
      password: '40028922',
    };

    const response = await request(app)
      .post('/users')
      .send({
        ...userData,
        confirmPassword: '40028922',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should not be able to create a new user without initials', async () => {
    const userData = {
      name: 'Teste email',
      email: 'withoutInitials@mail.com',
      initials: '',
      password: '40028922',
    };

    const response = await request(app)
      .post('/users')
      .send({
        ...userData,
        confirmPassword: '40028922',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should not be able to create a new user with invalid initials', async () => {
    const userData = {
      name: 'Teste email',
      email: 'invalidInitials@mail.com',
      initials: 'T3',
      password: '40028922',
    };

    const response = await request(app)
      .post('/users')
      .send({
        ...userData,
        confirmPassword: '40028922',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should not be able to create a new user if the passwords do not match', async () => {
    const userData = {
      name: 'Teste email',
      email: 'invalidInitials@mail.com',
      initials: 'II',
      password: '40028922',
    };

    const response = await request(app)
      .post('/users')
      .send({
        ...userData,
        confirmPassword: '40028922teste',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should not be able to create a new user if the password does not have at least 8 characters', async () => {
    const userData = {
      name: 'Teste email',
      email: 'invalidInitials@mail.com',
      initials: 'II',
      password: '40028922',
    };

    const response = await request(app)
      .post('/users')
      .send({
        ...userData,
        confirmPassword: '',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});
