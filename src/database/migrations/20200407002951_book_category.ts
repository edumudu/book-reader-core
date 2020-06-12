import Knex, { SchemaBuilder } from 'knex';

export const up = function (knex: Knex): SchemaBuilder {
  return knex.schema.createTable('book_category', table => {
    table.integer('book_id', 10).unsigned().notNullable();
    table.integer('category_id', 10).unsigned().notNullable();

    table.foreign('book_id').references('id').inTable('tb_books').onUpdate('CASCADE').onDelete('CASCADE');
    table.foreign('category_id').references('id').inTable('tb_category').onDelete('CASCADE').onUpdate('CASCADE');
  });
};

export const down = (knex: Knex): SchemaBuilder => knex.schema.dropTable('book_category');
