const { User } = require('../../src/app/models');

describe('Authentication', () => {
  it('should sum two numbers', async () => {
    const user = await User.create({
      name: 'Edilson Pacheco',
      email: 'edilsonpacheco6@gmail.com',
      password_hash: '123123',
    });
    console.log(user);
    expect(user.email).toBe('edilsonpacheco6@gmail.com');
  });
});
