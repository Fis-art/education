import { getKnex } from '@shared/database/knex'
import { BaseRepository } from '@shared/database/base-repository'
import { User, UserWithRole, CreateUserInput, UpdateUserInput, UserQueryParams, PaginatedUsers } from './users.types'
import { NotFoundError } from '@shared/errors'

export class UsersRepository extends BaseRepository<User> {
  constructor() {
    super('users')
  }

  async findWithRole(options: UserQueryParams = {} as any): Promise<PaginatedUsers> {
    const { page = 1, limit = 10, search, role_id, is_active, sort_by = 'created_at', sort_order = 'desc' } = options
    const offset = (page - 1) * limit

    let query = this.knex(this.tableName)
      .join('roles', 'users.role_id', 'roles.id')
      .whereNull('users.deleted_at')
      .select(
        'users.*',
        'roles.name as role_name',
        'roles.display_name as role_display_name'
      )

    if (search) {
      query = query.where(function() {
        this.where('users.name', 'ilike', `%${search}%`)
          .orWhere('users.email', 'ilike', `%${search}%`)
          .orWhere('users.username', 'ilike', `%${search}%`)
      })
    }

    if (role_id) {
      query = query.where('users.role_id', role_id)
    }

    if (is_active !== undefined) {
      query = query.where('users.is_active', is_active)
    }

    const totalQuery = query.clone()
    const [{ count }] = await totalQuery.count('* as count')
    const total = Number(count)

    query = query.orderBy(`users.${sort_by}`, sort_order).limit(limit).offset(offset)

    const data = await query as UserWithRole[]

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

  async findByEmail(email: string): Promise<User | null> {
    return this.knex(this.tableName)
      .where('email', email)
      .whereNull('deleted_at')
      .first()
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.knex(this.tableName)
      .where('username', username)
      .whereNull('deleted_at')
      .first()
  }

  async createWithRole(data: CreateUserInput): Promise<UserWithRole> {
    return this.knex.transaction(async (trx) => {
      const [user] = await trx(this.tableName)
        .insert({
          ...data,
          password_hash: data.password,
        })
        .returning('*')

      const userWithRole = await trx(this.tableName)
        .join('roles', 'users.role_id', 'roles.id')
        .where('users.id', user.id)
        .select('users.*', 'roles.name as role_name', 'roles.display_name as role_display_name')
        .first()

      return userWithRole as UserWithRole
    })
  }

  async updateWithRole(id: string, data: UpdateUserInput): Promise<UserWithRole> {
    return this.knex.transaction(async (trx) => {
      await trx(this.tableName)
        .where('id', id)
        .whereNull('deleted_at')
        .update({ ...data, updated_at: trx.fn.now() })

      const user = await trx(this.tableName)
        .join('roles', 'users.role_id', 'roles.id')
        .where('users.id', id)
        .whereNull('users.deleted_at')
        .select('users.*', 'roles.name as role_name', 'roles.display_name as role_display_name')
        .first()

      if (!user) {
        throw new NotFoundError('User', id)
      }

      return user as UserWithRole
    })
  }

  async changePassword(id: string, newHash: string): Promise<void> {
    const result = await this.knex(this.tableName)
      .where('id', id)
      .whereNull('deleted_at')
      .update({ password_hash: newHash, updated_at: this.knex.fn.now() })

    if (!result) {
      throw new NotFoundError('User', id)
    }
  }
}

export const usersRepository = new UsersRepository()