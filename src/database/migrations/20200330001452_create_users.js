exports.up = function(knex) {
  return knex.schema.createTable('tb_users', (table) => {
    table.increments();
    table.string('username').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('token').notNullable();
    table.date('created_at').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tb_users');
};
