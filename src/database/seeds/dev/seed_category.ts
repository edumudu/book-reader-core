import Knex from 'knex';

export const seed = async (knex: Knex): Promise<number[]> =>
  await knex('tb_category')
    .del()
    .then(() => knex('tb_category').insert([{ name: 'fiction' }, { name: 'action' }, { name: 'mistery' }]));
