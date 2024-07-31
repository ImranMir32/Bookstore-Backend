import { Knex } from 'knex';
import Config from './helpers/config';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: Config.getDbHost(),
      user: Config.getDbUser(),
      password: Config.getDbPassword(),
      database: Config.getDbName(),
      ssl: {
        rejectUnauthorized: false, // Set to true in production
      },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/db/migrations',
    },
    pool: {
      min: 2,
      max: 10,
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },
};

export default config;
