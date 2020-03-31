const configuration = require('../../knexfile');
const knex = require('knex');

const env = process.env.NODE_ENV || 'development';

module.exports = knex(configuration[env]);
