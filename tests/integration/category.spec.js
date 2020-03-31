const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

async function createCategory(data) {
  const categoryData = {
    name: 'fiction',
    created_at: new Date().toISOString().substr(0,10),
    ...data
  };

  return await request(app)
    .post('/category')
    .send(categoryData);
}

describe('Category', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.migrate.rollback();
    await connection.destroy();
  });

  it('Should list all categorys', async () => {
    await connection.seed.run('seed_category');

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
    const category = createCategory();
    await connection.seed.run('seed_user');

    const user = connection('tb_users').select('*').first();

    const response = await request(app)
      .delete(`/category/${category.id}`)
      .set('authorization', user.token)
      .send();
    
    expect(response.status).toBe(204);
  });

  it('Should be able to edit a category', () => {
    const category = createCategory();
    await connection.seed.run('seed_user');

    const user = connection('tb_users').select('*').first();

    const response = await request(app)
      .put(`/category/${user.id}`)
      .set('authorization', user.token)
      .send({
        name: 'new category'
      });

    expect(response.status).toBe(204);
  });
});
