import request from 'supertest';
import { app } from '../../app';

it('fails when an email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      pasword: 'password'
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await global.signup();
  
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'incorrect'
    })
    .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
  await global.signup();
  
  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200);
  
  expect(response.get('Set-Cookie')).toBeDefined();
});
