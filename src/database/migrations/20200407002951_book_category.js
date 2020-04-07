exports.up = function(knex) {
  return knex.schema.createTable('book_category', table => {
    table.increments();
    table.integer('book_id', 10).unsigned().notNullable();
    table.integer('category_id', 10).unsigned().notNullable();

    table.foreign('book_id')
      .references('id')
      .inTable('tb_books')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    
    table.foreign('category_id')
      .references('id')
      .inTable('tb_category')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('book_category');
};
