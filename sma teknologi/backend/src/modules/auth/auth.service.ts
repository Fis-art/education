import { Knex } from 'knex'
import { getKnex } from '../../shared/database/knex'
import { redis } from '../../config/redis'
import { NotFoundError, UnauthorizedError } from '../../shared/errors'
import { hashPassword, comparePassword, generateAccessToken, generateRefreshToken, verifyRefreshToken, type JWTPayload, type Role } from '../../shared/utils/jwt'

const TOKEN_VERSION_PREFIX = 'token_version:'
const REFRESH_TOKEN_PREFIX = 'refresh_token:'
const BLACKLIST_PREFIX = 'blacklist:'

interface UserProfile {
  id: string
  name: string
  email: string
  username: string | null
  role: Role
  avatar: string | null
  phone: string | null
  lastLoginAt: string | null
  permissions: string[]
}

export class AuthService {
  private knex: Knex

  constructor() {
    this.knex = getKnex()
  }

  async login(email: string, password: string, rememberMe = false): Promise<{ user: UserProfile; accessToken: string; expiresIn: number }> {
    const user = await this.knex('users')
      .join('roles', 'users.role_id', 'roles.id')
      .where('users.email', email)
      .whereNull('users.deleted_at')
      .where('users.is_active', true)
      .select(
        'users.id',
        'users.name',
        'users.email',
        'users.username',
        'users.password_hash',
        'users.avatar',
        'users.phone',
        'roles.name as role_name'
      )
      .first()

    if (!user) {
      throw new UnauthorizedError('Email atau password salah')
    }

    const isValid = await comparePassword(password, user.password_hash)
    if (!isValid) {
      throw new UnauthorizedError('Email atau password salah')
    }

    await this.knex('users')
      .where('id', user.id)
      .update({ last_login_at: this.knex.fn.now() })

    const tokenVersion = await this.getTokenVersion(user.id)
    const newTokenVersion = await this.incrementTokenVersion(user.id)

    const accessToken = generateAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role_name as Role,
      tokenVersion: newTokenVersion,
    })

    const refreshToken = generateRefreshToken({
      sub: user.id,
      tokenVersion: newTokenVersion,
    })

    await this.storeRefreshToken(user.id, refreshToken, rememberMe)

    const permissions = await this.getUserPermissions(user.role_name as Role)

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role_name as Role,
        avatar: user.avatar,
        phone: user.phone,
        lastLoginAt: null,
        permissions,
      },
      accessToken,
      expiresIn: 15 * 60,
    }
  }

  async refresh(refreshToken: string): Promise<{ accessToken: string; expiresIn: number }> {
    const payload = verifyRefreshToken(refreshToken)

    const isBlacklisted = await redis.get(`${BLACKLIST_PREFIX}${refreshToken}`)
    if (isBlacklisted) {
      throw new UnauthorizedError('Refresh token telah dicabut')
    }

    const user = await this.knex('users')
      .join('roles', 'users.role_id', 'roles.id')
      .where('users.id', payload.sub)
      .whereNull('users.deleted_at')
      .where('users.is_active', true)
      .select('users.id', 'users.email', 'roles.name as role_name')
      .first()

    if (!user) {
      throw new UnauthorizedError('User tidak ditemukan atau tidak aktif')
    }

    const currentVersion = await this.getTokenVersion(payload.sub)
    if (payload.tokenVersion !== currentVersion) {
      throw new UnauthorizedError('Token tidak valid (versi tidak cocok)')
    }

    const newTokenVersion = await this.incrementTokenVersion(payload.sub)
    await this.revokeRefreshToken(refreshToken)

    const newAccessToken = generateAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role_name as Role,
      tokenVersion: newTokenVersion,
    })

    const newRefreshToken = generateRefreshToken({
      sub: user.id,
      tokenVersion: newTokenVersion,
    })

    await this.storeRefreshToken(user.id, newRefreshToken, true)

    return {
      accessToken: newAccessToken,
      expiresIn: 15 * 60,
    }
  }

  async logout(refreshToken: string): Promise<void> {
    try {
      const payload = verifyRefreshToken(refreshToken)
      await this.revokeRefreshToken(refreshToken)
      await redis.del(`${REFRESH_TOKEN_PREFIX}${payload.sub}`)
    } catch {
      // Token already invalid
    }
  }

  async getProfile(userId: string): Promise<UserProfile> {
    const user = await this.knex('users')
      .join('roles', 'users.role_id', 'roles.id')
      .where('users.id', userId)
      .whereNull('users.deleted_at')
      .select(
        'users.id',
        'users.name',
        'users.email',
        'users.username',
        'users.avatar',
        'users.phone',
        'users.last_login_at',
        'roles.name as role_name'
      )
      .first()

    if (!user) {
      throw new NotFoundError('User', userId)
    }

    const permissions = await this.getUserPermissions(user.role_name as Role)

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role_name as Role,
      avatar: user.avatar,
      phone: user.phone,
      lastLoginAt: user.last_login_at,
      permissions,
    }
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    const user = await this.knex('users')
      .where('id', userId)
      .whereNull('deleted_at')
      .select('password_hash')
      .first()

    if (!user) {
      throw new NotFoundError('User', userId)
    }

    const isValid = await comparePassword(currentPassword, user.password_hash)
    if (!isValid) {
      throw new UnauthorizedError('Password saat ini tidak benar')
    }

    const newHash = await hashPassword(newPassword)
    await this.knex('users')
      .where('id', userId)
      .update({ password_hash: newHash, updated_at: this.knex.fn.now() })

    await this.revokeAllRefreshTokens(userId)
  }

  private async getTokenVersion(userId: string): Promise<number> {
    const version = await redis.get(`${TOKEN_VERSION_PREFIX}${userId}`)
    return version ? parseInt(version, 10) : 0
  }

  private async incrementTokenVersion(userId: string): Promise<number> {
    const newVersion = await redis.incr(`${TOKEN_VERSION_PREFIX}${userId}`)
    return newVersion
  }

  private async storeRefreshToken(userId: string, token: string, rememberMe: boolean): Promise<void> {
    const ttl = rememberMe ? 7 * 24 * 60 * 60 : 24 * 60 * 60
    await redis.setex(`${REFRESH_TOKEN_PREFIX}${userId}`, ttl, token)
  }

  private async revokeRefreshToken(token: string): Promise<void> {
    const payload = verifyRefreshToken(token)
    const ttl = Math.ceil((payload.exp! * 1000 - Date.now()) / 1000)
    if (ttl > 0) {
      await redis.setex(`${BLACKLIST_PREFIX}${token}`, ttl, '1')
    }
  }

  private async revokeAllRefreshTokens(userId: string): Promise<void> {
    const token = await redis.get(`${REFRESH_TOKEN_PREFIX}${userId}`)
    if (token) {
      await this.revokeRefreshToken(token)
      await redis.del(`${REFRESH_TOKEN_PREFIX}${userId}`)
    }
    await this.incrementTokenVersion(userId)
  }

  private async getUserPermissions(role: Role): Promise<string[]> {
    const roleRecord = await this.knex('roles')
      .where('name', role)
      .select('permissions')
      .first()

    if (roleRecord?.permissions) {
      try {
        return JSON.parse(roleRecord.permissions as string)
      } catch {
        return []
      }
    }

    const defaultPermissions: Record<Role, string[]> = {
      super_admin: ['*'],
      admin: [
        'guru:read', 'guru:write', 'guru:delete',
        'jurusan:read', 'jurusan:write', 'jurusan:delete',
        'ekstrakurikuler:read', 'ekstrakurikuler:write', 'ekstrakurikuler:delete',
        'berita:read', 'berita:write', 'berita:delete', 'berita:publish',
        'pengumuman:read', 'pengumuman:write', 'pengumuman:delete',
        'agenda:read', 'agenda:write', 'agenda:delete',
        'prestasi:read', 'prestasi:write', 'prestasi:delete',
        'galeri:read', 'galeri:write', 'galeri:delete',
        'hero_slider:read', 'hero_slider:write', 'hero_slider:delete',
        'download:read', 'download:write', 'download:delete',
        'ppdb:read', 'ppdb:write', 'ppdb:verify',
        'setting:read', 'setting:write',
        'dashboard:read',
      ],
      editor: [
        'berita:read', 'berita:write_own', 'berita:delete_own',
        'pengumuman:read', 'pengumuman:write_own', 'pengumuman:delete_own',
        'agenda:read', 'agenda:write_own', 'agenda:delete_own',
        'prestasi:read', 'prestasi:write_own', 'prestasi:delete_own',
        'galeri:read', 'galeri:write_own',
        'dashboard:read',
      ],
      viewer: ['dashboard:read'],
    }

    return defaultPermissions[role] || []
  }
}

export const authService = new AuthService()