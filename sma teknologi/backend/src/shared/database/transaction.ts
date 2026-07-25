import { getKnex } from './knex'

export async function withTransaction<T>(
  callback: (trx: any) => Promise<T>
): Promise<T> {
  const knex = getKnex()
  const trx = await knex.transaction()
  try {
    const result = await callback(trx)
    await trx.commit()
    return result
  } catch (error) {
    await trx.rollback()
    throw error
  }
}

export async function runInTransaction<T>(
  callback: (trx: any) => Promise<T>
): Promise<T> {
  return withTransaction(callback)
}