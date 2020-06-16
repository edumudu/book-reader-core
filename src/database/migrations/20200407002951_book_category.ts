import Knex, { SchemaBuilder } from 'knex';

export function up(knex: Knex): SchemaBuilder {
  return knex.schema.createTable('books_categories', table => {
    table.integer('book_id', 10).unsigned().notNullable();
    table.integer('category_id', 10).unsigned().notNullable();

    table.foreign('book_id').references('id').inTable('books').onUpdate('CASCADE').onDelete('CASCADE');
    table.foreign('category_id').references('id').inTable('categories').onDelete('CASCADE').onUpdate('CASCADE');
  });
}

export function down(knex: Knex): SchemaBuilder {
  return knex.schema.dropTable('books_categories');
}
