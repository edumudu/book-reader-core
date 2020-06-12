import Knex, { SchemaBuilder } from 'knex';

export const up = (knex: Knex): SchemaBuilder => {
  return knex.schema.createTable('tb_books', table => {
    table.increments();
    table.string('name').notNullable();
    table.text('sinopse').notNullable();
    table.integer('author_id', 10).unsigned().notNullable();
    table.integer('artist_id', 10).unsigned().notNullable();
    table.integer('posted_by', 10).unsigned().notNullable();
    table.enu('type', ['novel', 'manga']).notNullable();
    table.boolean('is_visible').defaultTo(false);

    table.timestamps(true, true);

    table.foreign('posted_by').references('id').inTable('tb_users').onUpdate('CASCADE').onDelete('CASCADE');
    table.foreign('author_id').references('id').inTable('tb_authors').onUpdate('CASCADE').onDelete('CASCADE');
    table.foreign('artist_id').references('id').inTable('tb_artists').onUpdate('CASCADE').onDelete('CASCADE');
  });
};

export const down = (knex: Knex): SchemaBuilder => knex.schema.dropTable('tb_books');
