import Knex, { SchemaBuilder } from 'knex';

export function up(knex: Knex): SchemaBuilder {
  return knex.schema.createTable('books', table => {
    table.increments();
    table.string('name').notNullable();
    table.text('sinopse').notNullable();
    table.integer('author_id', 10).unsigned().notNullable();
    table.integer('artist_id', 10).unsigned().notNullable();
    table.integer('user_id', 10).unsigned().notNullable();
    table.enu('type', ['novel', 'manga']).notNullable();
    table.boolean('is_visible').defaultTo(false);

    table.timestamps(true, true);

    table.foreign('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    table.foreign('author_id').references('id').inTable('authors').onUpdate('CASCADE').onDelete('CASCADE');
    table.foreign('artist_id').references('id').inTable('artists').onUpdate('CASCADE').onDelete('CASCADE');
  });
}

export function down(knex: Knex): SchemaBuilder {
  return knex.schema.dropTable('books');
}
