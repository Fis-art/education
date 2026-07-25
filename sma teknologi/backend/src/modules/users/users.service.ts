import { usersRepository } from './users.repository'
import { hashPassword, comparePassword } from '@shared/utils/password'
import { NotFoundError, ConflictError, UnauthorizedError } from '@shared/errors'
import { CreateUserInput, UpdateUserInput, ChangePasswordInput, UserQueryParams, PaginatedUsers, UserWithRole } from './users.types'

export class UsersService {
  async getAll(params: UserQueryParams): Promise<PaginatedUsers> {
    return usersRepository.findWithRole(params)
  }

  async getById(id: string): Promise<UserWithRole> {
    const user = await usersRepository.findById(id)
    if (!user) {
      throw new NotFoundError('User', id)
    }
    return user as UserWithRole
  }

  async create(data: CreateUserInput): Promise<UserWithRole> {
    const existingEmail = await usersRepository.findByEmail(data.email)
    if (existingEmail) {
      throw new ConflictError('Email sudah terdaftar')
    }

    if (data.username) {
      const existingUsername = await usersRepository.findByUsername(data.username)
      if (existingUsername) {
        throw new ConflictError('Username sudah terdaftar')
      }
    }

    const passwordHash = await hashPassword(data.password)
    return usersRepository.createWithRole({
      ...data,
      password: passwordHash,
    })
  }

  async update(id: string, data: UpdateUserInput): Promise<UserWithRole> {
    const user = await usersRepository.findById(id)
    if (!user) {
      throw new NotFoundError('User', id)
    }

    if (data.email && data.email !== user.email) {
      const existingEmail = await usersRepository.findByEmail(data.email)
      if (existingEmail) {
        throw new ConflictError('Email sudah terdaftar')
      }
    }

    if (data.username && data.username !== user.username) {
      const existingUsername = await usersRepository.findByUsername(data.username)
      if (existingUsername) {
        throw new ConflictError('Username sudah terdaftar')
      }
    }

    return usersRepository.updateWithRole(id, data)
  }

  async changePassword(id: string, data: ChangePasswordInput): Promise<void> {
    const user = await usersRepository.findById(id)
    if (!user) {
      throw new NotFoundError('User', id)
    }

    if (data.current_password) {
      const isValid = await comparePassword(data.current_password, user.password_hash)
      if (!isValid) {
        throw new UnauthorizedError('Password saat ini tidak benar')
      }
    }

    const newHash = await hashPassword(data.new_password)
    await usersRepository.changePassword(id, newHash)
  }

  async delete(id: string): Promise<void> {
    const user = await usersRepository.findById(id)
    if (!user) {
      throw new NotFoundError('User', id)
    }
    await usersRepository.delete(id)
  }

  async getRoles(): Promise<Array<{ id: string; name: string; display_name: string }>> {
    const roles = await usersRepository.knex('roles')
      .select('id', 'name', 'display_name')
      .orderBy('display_name')
    return roles
  }
}

export const usersService = new UsersService()