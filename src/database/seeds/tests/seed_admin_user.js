const faker = require('faker');

exports.seed = function(knex) {
  return knex('tb_users').del()
    .then(function () {
      return knex('tb_users').insert({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      });
    });
};
