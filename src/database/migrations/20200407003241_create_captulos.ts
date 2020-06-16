import Knex, { SchemaBuilder } from 'knex';

export function up(knex: Knex): SchemaBuilder {
  return knex.schema.createTable('chapters', table => {
    table.increments();
    table.string('name');
    table.integer('book_id', 10).unsigned().notNullable();
    table.integer('user_id', 10).unsigned().notNullable();

    table.timestamps(true, true);

    table.foreign('book_id').references('id').inTable('books').onUpdate('CASCADE').onDelete('CASCADE');
    table.foreign('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
  });
}

export function down(knex: Knex): SchemaBuilder {
  return knex.schema.dropTable('chapters');
}
