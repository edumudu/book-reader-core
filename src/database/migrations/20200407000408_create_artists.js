exports.up = function(knex) {
  return knex.schema.createTable('tb_artists', table => {
    table.increments();
    table.string('name').notNullable();
    table.date('created_at').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tb_artists');
};
