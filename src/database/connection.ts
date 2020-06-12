// eslint-disable-next-line @typescript-eslint/no-var-requires
const configuration = require('../../knexfile');
import knex from 'knex';

const env = process.env.NODE_ENV || 'development';

export default knex(configuration[env]);
