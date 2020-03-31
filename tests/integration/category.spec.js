const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

async function createCategory(data = {}) {
  await connection.seed.run({ specific: 'seed_user.js' }); 

  const user = await connection('tb_users')
    .where('access_level', 'admin')
    .select('*')
    .first();

  const categoryData = {
    name: 'fiction',
    
    ...data
  };

  return await request(app)
    .post('/category')
    .set('authorization', user.token)
    .send(categoryData);
}

afterAll(async () => await connection.destroy());

describe('Category', () => {
  beforeEach(async () => await connection.migrate.latest());
  // afterEach(async () => await connection.migrate.rollback());

  it('Should list all categorys', async () => {
    await connection.seed.run({ specific: 'seed_category.js' });

    const response = await request(app)
      .get('/category')
      .send();

    expect(response.status).toBe(200);
    expect(response.header['x-total-count']).toBeDefined();
  });

  it('Should be able to create new category', async () => {
    const response = await createCategory();

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
  });

  it('Should be able to delete a category', async () => {
    const responseCategory = await createCategory();
    await connection.seed.run();

    const user = await connection('tb_users')
      .where('access_level', 'admin')
      .select('*')
      .first();

    const response = await request(app)
      .delete(`/category/${responseCategory.body.id}`)
      .set('authorization', user.token)
      .send();
    
    expect(response.status).toBe(204);
  });

  it('Should be able to edit a category', async () => {
    const responseCategory = await createCategory();
    await connection.seed.run(); 

    const user = await connection('tb_users')
      .where('access_level', 'admin')
      .select('*')
      .first();

    const response = await request(app)
      .put(`/category/${responseCategory.body.id}`)
      .set('authorization', user.token)
      .send({
        name: 'new category'
      });

    expect(response.status).toBe(204);
  });
});
