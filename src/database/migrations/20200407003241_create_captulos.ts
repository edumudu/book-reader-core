import Knex, { SchemaBuilder } from 'knex';

export function up(knex: Knex): SchemaBuilder {
  return knex.schema.createTable('tb_captulos', table => {
    table.increments();
    table.string('name');
    table.integer('book_id', 10).unsigned().notNullable();
    table.integer('posted_by', 10).unsigned().notNullable();

    table.timestamps(true, true);

    table.foreign('book_id').references('id').inTable('tb_books').onUpdate('CASCADE').onDelete('CASCADE');
    table.foreign('posted_by').references('id').inTable('tb_users').onUpdate('CASCADE').onDelete('CASCADE');
  });
}

export function down(knex: Knex): SchemaBuilder {
  return knex.schema.dropTable('tb_captulos');
}
