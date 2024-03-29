const request = require('supertest');
const app = require('../../src/app');
const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate');
const factory = require('../factory');

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credations', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });
    const response = await request(app).post('/sessions').send({
      email: user.email,
      password: '123456',
    });

    expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid credations', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });
    const response = await request(app).post('/sessions').send({
      email: user.email,
      password: '123123',
    });
    expect(response.status).toBe(401);
  });

  it('should return a JWT token when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });
    const response = await request(app).post('/sessions').send({
      email: user.email,
      password: '123456',
    });
    expect(response.body).toHaveProperty('token');
  });
  it('should be able to access private routes when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });
  it('it should not to be able to access private routes without jwt token', async () => {
    const response = await request(app)
      .get('/dashboard');
    expect(response.status).toBe(401);
  });
  it('should not be able to access private routes with a invalid jwt token', async () => {
    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', 'Bearer 123123');
    expect(response.status).toBe(401);
  });
});
