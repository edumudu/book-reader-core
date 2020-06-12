import Knex from 'knex';
import encryptPassword from '../../../utils/encryptPassword';

export const seed = async (knex: Knex): Promise<number[]> =>
  await knex('tb_users')
    .del()
    .then(() =>
      knex('tb_users').insert([
        {
          username: 'edumudu',
          email: 'eduardomudutiu@gmail.com',
          password: encryptPassword('admin'),
          access_level: 'admin',
        },
      ]),
    );
