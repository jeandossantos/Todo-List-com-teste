import app from '../../app';
import request from 'supertest';
import { Client } from 'pg';
import { CreateUserDTO } from '../createUser/CreateUserDTO';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

beforeAll(async () => {
  await client.connect();
});

beforeEach(async () => {
  await client.query('delete from users');
});

afterAll(async () => {
  await client.end();
});

describe('Authenticate User', () => {
  it('should be able to authenticate with an existing user', async () => {
    const userData: CreateUserDTO = {
      name: 'Authenticate User',
      initials: 'AU',
      email: 'authuser@test.com',
      password: '40028922',
      confirmPassword: '40028922',
    };

    await request(app).post('/users').send(userData);

    const response = await request(app).post('/authenticate').send({
      email: userData.email,
      password: userData.password,
    });

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should not be able to authenticate without an email', async () => {
    const userData: CreateUserDTO = {
      name: 'Authenticate User',
      initials: 'AU',
      email: 'authuser@test.com',
      password: '40028922',
      confirmPassword: '40028922',
    };

    await request(app).post('/users').send(userData);

    const response = await request(app).post('/authenticate').send({
      password: userData.password,
    });

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('Enter E-mail and password!');
  });

  it('should not be able to authenticate without a password', async () => {
    const userData: CreateUserDTO = {
      name: 'Authenticate User',
      initials: 'AU',
      email: 'authuser@test.com',
      password: '40028922',
      confirmPassword: '40028922',
    };

    await request(app).post('/users').send(userData);

    const response = await request(app).post('/authenticate').send({
      email: userData.email,
      //password: userData.password,
    });

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('Enter E-mail and password!');
  });

  it('should not be able to authenticate with an unregister email', async () => {
    const userData: CreateUserDTO = {
      name: 'Authenticate User',
      initials: 'AU',
      email: 'authuser@test.com',
      password: '40028922',
      confirmPassword: '40028922',
    };

    const response = await request(app).post('/authenticate').send({
      email: userData.email,
      password: userData.password,
    });

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('E-mail not registered!');
  });

  it('should not be able to authenticate with an invalid password', async () => {
    const userData: CreateUserDTO = {
      name: 'Authenticate User',
      initials: 'AU',
      email: 'authuser@test.com',
      password: '40028922',
      confirmPassword: '40028922',
    };

    await request(app).post('/users').send(userData);

    const response = await request(app).post('/authenticate').send({
      email: userData.email,
      password: 'senhaErrada!',
    });

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('E-mail and/or password invalid.');
  });
});
