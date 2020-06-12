import Knex, { SchemaBuilder } from 'knex';

export const up = (knex: Knex): SchemaBuilder => {
  return knex.schema.createTable('tb_artists', table => {
    table.increments();
    table.string('name').notNullable();

    table.timestamps(true, true);
  });
};

export const down = (knex: Knex): SchemaBuilder => knex.schema.dropTable('tb_artists');
