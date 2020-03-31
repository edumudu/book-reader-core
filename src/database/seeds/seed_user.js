const encryptPassword = require('../../utils/encryptPassword');
const generateUniqueToken = require('../../utils/generateUniqueToken');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tb_users').del()
    .then(function () {
      // Inserts seed entries
      return knex('tb_users').insert([
        {
          username: 'edumudu',
          email: 'eduardomudutiu@gmail.com',
          password: encryptPassword('admin'),
          access_level: 'admin',
          created_at: new Date().toISOString().substr(0, 10),
          token: generateUniqueToken()
        },
      ]);
    });
};
