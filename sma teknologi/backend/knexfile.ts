import { knexSnakeCaseMappers } from 'objection'
import type { Knex } from 'knex'
import dotenv from 'dotenv'

dotenv.config()

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 3306,
      user: process.env.DATABASE_USER || 'smk_user',
      password: process.env.DATABASE_PASSWORD || 'smk_pass',
      database: process.env.DATABASE_NAME || 'smk_tekplus',
      charset: 'utf8mb4',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations',
      loadExtensions: ['.ts', '.js'],
    },
    seeds: {
      directory: './database/seeders',
      loadExtensions: ['.ts', '.js'],
    },
    ...knexSnakeCaseMappers(),
    debug: process.env.NODE_ENV === 'development',
  },

  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT) || 3306,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      charset: 'utf8mb4',
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    },
    pool: {
      min: 2,
      max: 20,
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations',
      loadExtensions: ['.ts', '.js'],
    },
    seeds: {
      directory: './database/seeders',
      loadExtensions: ['.ts', '.js'],
    },
    ...knexSnakeCaseMappers(),
  },

  test: {
    client: 'mysql2',
    connection: {
      host: process.env.TEST_DATABASE_HOST || 'localhost',
      port: Number(process.env.TEST_DATABASE_PORT) || 3306,
      user: process.env.TEST_DATABASE_USER || 'smk_user',
      password: process.env.TEST_DATABASE_PASSWORD || 'smk_pass',
      database: process.env.TEST_DATABASE_NAME || 'smk_tekplus_test',
      charset: 'utf8mb4',
    },
    pool: {
      min: 1,
      max: 5,
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations',
      loadExtensions: ['.ts', '.js'],
    },
    seeds: {
      directory: './database/seeders',
      loadExtensions: ['.ts', '.js'],
    },
    ...knexSnakeCaseMappers(),
  },
}

export default config