exports.up = function(knex) {
  return knex.schema.createTable('tb_books', table => {
    table.increments();
    table.string('name').notNullable();
    table.text('sinopse').notNullable();
    table.integer('posted_by', 10).unsigned().notNullable();
    table.enu('type', ['novel', 'manga']).notNullable();
    table.boolean('is_visible').defaultTo(false);
    table.date('created_at').notNullable();

    table.foreign('posted_by')
      .references('id')
      .inTable('tb_users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tb_books');
};
  