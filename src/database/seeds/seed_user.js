const faker = require('faker');
const encryptPassword = require('../../utils/encryptPassword');
const generateUniqueToken = require('../../utils/generateUniqueToken');

const createFakeUser = () => ({
  username: faker.internet.userName(),
  password: encryptPassword(faker.random.alphaNumeric()),
  email: faker.internet.email(),
  created_at: faker.date.past(),
  token: generateUniqueToken()
})

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tb_users').del()
    .then(async () => {
      
      const fakeUsers = [];
      const totalUsers = 50;

      for(let i = 0; i < totalUsers; i++){
        fakeUsers.push(createFakeUser());
      }

      await knex('tb_users').insert(fakeUsers);
    });
};
