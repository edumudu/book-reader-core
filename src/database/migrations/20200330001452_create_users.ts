import Knex, { SchemaBuilder } from 'knex';

export const up = (knex: Knex): SchemaBuilder => {
  return knex.schema.createTable('tb_users', table => {
    table.increments();
    table.string('username').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.enu('access_level', ['admin', 'mod', 'customer']).defaultTo('customer').notNullable();

    table.timestamps(true, true);
  });
};

export const down = (knex: Knex): SchemaBuilder => knex.schema.dropTable('tb_users');
