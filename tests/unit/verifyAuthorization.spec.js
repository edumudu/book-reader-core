const verifyAuthorization = require('../../src/utils/verifyAuthorization');
const connection = require('../../src/database/connection');

describe('', () => {
  beforeAll(async () => {
    await connection.migrate.latest(),
    await connection.seed.run();
  });
  
  afterAll(async () => {
    await connection.migrate.rollback();
    await connection.destroy();
  });

  it('Should verify if a user have acces level to edit and delete things', async() => {
    const user = await connection('tb_users')
      .where({ access_level: 'admin' })
      .select('*')
      .first();

    expect(user).toHaveProperty('token');
    expect(verifyAuthorization(user.token)).toBeTruthy();
  });

  it('Should return none', async () => {
    expect(verifyAuthorization('defa2da5d')).toBeFalsy();
  });

  it('Should verify specific level access', async () => {
    const user = await connection('tb_users')
      .where({ access_level: 'admin' })
      .select('*')
      .first();

    expect(user).toHaveProperty('token');
    expect(verifyAuthorization(user.token, ['customer'])).toBeFalsy();
  });
});
