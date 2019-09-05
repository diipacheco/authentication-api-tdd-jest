const request = require('supertest');
const { User } = require('../../src/app/models');
const app = require('../../src/app');
const truncate = require('../utils/truncate');

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });


  it('should authenticate with valid credations', async () => {
    const user = await User.create({
      name: 'Edilson Pacheco',
      email: 'edilsonpacheco6@gmail.com',
      password_hash: '123123',
    });
    const response = await request(app).post('/sessions').send({
      email: user.email,
      password: '123456',
    });
    expect(response.status).toBe(200);
  });
});
