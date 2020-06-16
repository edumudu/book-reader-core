import Knex, { SchemaBuilder } from 'knex';

export function up(knex: Knex): SchemaBuilder {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('username').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.enu('access_level', ['admin', 'mod', 'customer']).defaultTo('customer').notNullable();

    table.timestamps(true, true);
  });
}

export function down(knex: Knex): SchemaBuilder {
  return knex.schema.dropTable('users');
}
