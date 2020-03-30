const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

async function createUser(userData) {
  const data = userData || {
    username: 'edumudu',
    email: 'eduardomudutiu@gmail.com',
    password: '123456',
  };

  return await request(app)
    .post('/user')
    .send(data);
}

describe('USER', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('Should be able to create a new user', async () => {
      const response = await createUser();

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('created_at');
      expect(response.body.token).toHaveLength(8);
      expect(response.body.created_at).toBe(new Date().toLocaleDateString());
      expect(typeof response.body.id).toBe('number');
  });

  it('Should be able delete user', async () => {
    const userResponse = await createUser();

    const response = await request(app)
      .delete(`/user/${userResponse.body.id}`)
      .set('authorization', userResponse.body.token)
      .send();

    expect(response.status).toBe(204);
  });

  it('Should be able edit user fields', async () => {
    const userResponse = await createUser();

    const newFields = {
      name: 'caju',
      password: '7654'
    };

    const response = await request(app)
      .put(`/user/${userResponse.body.id}`)
      .set('authorization', userResponse.body.token)
      .send(newFields);
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ...userResponse.body, ...newFields });
  });

  it('Should be able login in account', async () => {
    const userResponse = await createUser();

    const response = await request(app)
      .post('/user/session')
      .send({
        email: userResponse.body.email,
        password: userResponse.body.password
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toEqual(userResponse.body)
  });
});
