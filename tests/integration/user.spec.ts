import request from 'supertest';
import app from '../../src/app';

async function createUser(userData: Record<string, string | number> = {}) {
  const data = {
    username: 'edumudu',
    email: 'eduardomudutiu@gmail.com',
    password: '123456',
    role: 'admin',
    ...userData,
  };

  return await request(app).post('/user').send(data);
}

describe('USER', () => {
  // beforeAll(async () => await connection.migrate.latest(), 30000);
  // afterAll(async done => {
  //   await connection.migrate.rollback();
  //   await connection.destroy();
  //   done();
  // });

  it('Should be able to create a new user', async () => {
    const response = await createUser();

    const date = new Date().toISOString().substr(0, 10);

    expect(response.status).toBe(201);
    // expect(response.body).toHaveProperty('token');
    // expect(response.body).toHaveProperty('created_at');
    // expect(response.body).toHaveProperty('role');
    // expect(response.body.token).toHaveLength(8);
    // expect(response.body.created_at).toBe(date);
    // expect(typeof response.body.id).toBe('number');
    // expect('1').toBe('1');
  });

  // it('Should be able delete user', async () => {
  //   const userResponse = await createUser();

  //   const response = await request(app)
  //     .delete(`/user/${userResponse.body.id}`)
  //     .set('authorization', userResponse.body.token)
  //     .send();

  //   expect(response.status).toBe(204);
  // });

  // it('Should be able edit user fields', async () => {
  //   const userResponse = await createUser();

  //   const newFields = {
  //     username: 'caju',
  //     password: '7654',
  //   };

  //   const response = await request(app)
  //     .put(`/user/${userResponse.body.id}`)
  //     .set('authorization', userResponse.body.token)
  //     .send(newFields);

  //   expect(response.status).toBe(200);
  //   expect({ ...userResponse.body, ...newFields }).toEqual(response.body);
  // });
});
