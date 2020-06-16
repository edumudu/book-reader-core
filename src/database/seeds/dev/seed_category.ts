import Knex from 'knex';

export const seed = async (knex: Knex): Promise<number[]> =>
  await knex('categories')
    .del()
    .then(() => knex('categories').insert([{ name: 'fiction' }, { name: 'action' }, { name: 'mistery' }]));
