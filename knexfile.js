// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host :    'localhost',
      database: 'book_read',
      user:     'root',
      password: '',
      dateStrings: true
    },
    migrations: {
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds/dev'
    }
  },

  test: {
    client: 'mysql',
    connection: {
      host :    'localhost',
      database: 'book_read_test',
      user:     'root',
      password: '',
      dateStrings: true
    },
    migrations: {
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds/tests'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
