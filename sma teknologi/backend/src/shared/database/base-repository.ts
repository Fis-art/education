import { getKnex } from './knex'
import { NotFoundError } from '../errors'

export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResult<T> {
  data: T[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface QueryOptions {
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: Record<string, any>
}

export class BaseRepository<T extends { id: string }> {
  protected tableName: string
  protected knex = getKnex()

  constructor(tableName: string) {
    this.tableName = tableName
  }

  async findAll(options: QueryOptions = {}): Promise<T[]> {
    let query = this.knex(this.tableName).whereNull('deleted_at')

    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.where(key, value)
        }
      })
    }

    if (options.search) {
      // Override in child class for specific search logic
    }

    if (options.sortBy) {
      query = query.orderBy(options.sortBy, options.sortOrder || 'desc')
    } else {
      query = query.orderBy('created_at', 'desc')
    }

    return query as Promise<T[]>
  }

  async findPaginated(
    params: PaginationParams,
    options: QueryOptions = {}
  ): Promise<PaginatedResult<T>> {
    const { page = 1, limit = 10 } = params
    const offset = (page - 1) * limit

    let query = this.knex(this.tableName).whereNull('deleted_at')

    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.where(key, value)
        }
      })
    }

    if (options.search) {
      // Override in child class
    }

    const totalQuery = query.clone()
    const [{ count }] = await totalQuery.count('* as count')
    const total = Number(count)

    if (options.sortBy) {
      query = query.orderBy(options.sortBy, options.sortOrder || 'desc')
    } else {
      query = query.orderBy('created_at', 'desc')
    }

    const data = await query.limit(limit).offset(offset) as T[]

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async findById(id: string): Promise<T | null> {
    const result = await this.knex(this.tableName)
      .where({ id })
      .whereNull('deleted_at')
      .first()
    return result || null
  }

  async findByIdOrFail(id: string): Promise<T> {
    const result = await this.findById(id)
    if (!result) {
      throw new NotFoundError(this.tableName, id)
    }
    return result
  }

  async create(data: Partial<T>): Promise<T> {
    const [result] = await this.knex(this.tableName)
      .insert(data)
      .returning('*')
    return result as T
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const [result] = await this.knex(this.tableName)
      .where({ id })
      .whereNull('deleted_at')
      .update({ ...data, updated_at: this.knex.fn.now() })
      .returning('*')
    if (!result) throw new NotFoundError(this.tableName, id)
    return result as T
  }

  async delete(id: string, hard = false): Promise<void> {
    if (hard) {
      await this.knex(this.tableName).where({ id }).del()
    } else {
      const result = await this.knex(this.tableName)
        .where({ id })
        .whereNull('deleted_at')
        .update({ deleted_at: this.knex.fn.now() })
      if (!result) throw new NotFoundError(this.tableName, id)
    }
  }

  async restore(id: string): Promise<T> {
    const [result] = await this.knex(this.tableName)
      .where({ id })
      .whereNotNull('deleted_at')
      .update({ deleted_at: null, updated_at: this.knex.fn.now() })
      .returning('*')
    if (!result) throw new NotFoundError(this.tableName, id)
    return result as T
  }

  async exists(id: string): Promise<boolean> {
    const result = await this.knex(this.tableName)
      .where({ id })
      .whereNull('deleted_at')
      .first()
    return !!result
  }

  async count(filters: Record<string, any> = {}): Promise<number> {
    let query = this.knex(this.tableName).whereNull('deleted_at')
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query = query.where(key, value)
      }
    })
    const [{ count }] = await query.count('* as count')
    return Number(count)
  }
}