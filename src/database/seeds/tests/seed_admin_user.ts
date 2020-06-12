import Knex from 'knex';
import faker from 'faker';

export const seed = async (knex: Knex): Promise<number[]> =>
  await knex('tb_users')
    .del()
    .then(
      async () =>
        await knex('tb_users').insert({
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        }),
    );
