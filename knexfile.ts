import { Obj } from './src/@types/types';
import 'dotenv/config';

const obj: Obj = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      dateStrings: true,
    },
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds/dev',
    },
    pool: { min: 0, max: 7 },
  },

  test: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      database: 'book_read_test',
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      dateStrings: true,
    },
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds/tests',
    },
    pool: { min: 0, max: 7 },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

module.exports = obj;
