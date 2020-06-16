import Knex, { SchemaBuilder } from 'knex';

export function up(knex: Knex): SchemaBuilder {
  return knex.schema.createTable('authors', table => {
    table.increments();
    table.string('name').notNullable();

    table.timestamps(true, true);
  });
}

export function down(knex: Knex): SchemaBuilder {
  return knex.schema.dropTable('authors');
}
