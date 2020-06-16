import Knex from 'knex';
import faker from 'faker';

export const seed = async (knex: Knex): Promise<number[]> =>
  await knex('users')
    .del()
    .then(
      async () =>
        await knex('users').insert({
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        }),
    );
