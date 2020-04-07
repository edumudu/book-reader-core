exports.up = function(knex) {
  return knex.schema.createTable('tb_captulos', table => {
    table.increments();
    table.string('name');
    table.integer('book_id', 10).unsigned().notNullable();
    table.integer('posted_by', 10).unsigned().notNullable();
    table.date('created_at').notNullable();

    table.foreign('book_id')
      .references('id')
      .inTable('tb_books')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    
    table.foreign('posted_by')
      .references('id')
      .inTable('tb_users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tb_captulos');
};
