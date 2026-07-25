import Knex from 'knex'
import { config } from './env'
import { Model } from 'objection'

let knexInstance: Knex | null = null

export function getKnex(): Knex {
  if (!knexInstance) {
    throw new Error('Knex not initialized. Call initializeKnex() first.')
  }
  return knexInstance
}

export async function initializeKnex(): Promise<Knex> {
  if (knexInstance) return knexInstance

  const knexConfig = {
    client: 'mysql2',
    connection: {
      host: config.DATABASE_HOST,
      port: config.DATABASE_PORT,
      user: config.DATABASE_USER,
      password: config.DATABASE_PASSWORD,
      database: config.DATABASE_NAME,
      charset: 'utf8mb4',
      timezone: '+07:00',
    },
    pool: { min: 2, max: 10 },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations',
      loadExtensions: ['.ts', '.js'],
    },
    seeds: {
      directory: './database/seeders',
      loadExtensions: ['.ts', '.js'],
    },
    debug: config.NODE_ENV === 'development',
    acquireConnectionTimeout: 60000,
    ...knexSnakeCaseMappers(),
  }

  knexInstance = Knex(knexConfig)
  Model.knex(knexInstance)

  await knexInstance.raw('SELECT 1')
  console.log('Database connected')

  return knexInstance
}

export async function closeKnex(): Promise<void> {
  if (knexInstance) {
    await knexInstance.destroy()
    knexInstance = null
  }
}

function knexSnakeCaseMappers() {
  return {
    postProcessResponse: (result: any) => {
      return Knex.util.camelCaseKeys(result)
    },
    wrapIdentifier: (value: string, origImpl: any, queryContext: any) => {
      if (queryContext?.wrapIdentifier === false) return origImpl(value)
      return origImpl(Knex.util.snakeCase(value))
    },
  }
}

export { Knex }