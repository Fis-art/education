import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '@shared/utils/jwt'
import { UnauthorizedError } from '@shared/errors'
import { getKnex } from '@shared/database/knex'
import { JWTPayload } from '@modules/auth/auth.types'

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Token akses tidak ditemukan')
    }

    const token = authHeader.substring(7)
    const payload = verifyAccessToken(token)

    const knex = getKnex()
    const user = await knex('users')
      .join('roles', 'users.role_id', 'roles.id')
      .where('users.id', payload.sub)
      .whereNull('users.deleted_at')
      .where('users.is_active', true)
      .select('users.id', 'users.email', 'users.name', 'roles.name as role_name')
      .first()

    if (!user) {
      throw new UnauthorizedError('User tidak ditemukan atau tidak aktif')
    }

    req.user = {
      sub: user.id,
      email: user.email,
      role: user.role_name as JWTPayload['role'],
      iat: payload.iat,
      exp: payload.exp,
      iss: payload.iss,
      aud: payload.aud,
    }

    next()
  } catch (error) {
    next(error)
  }
}

export const optionalAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next()
    }

    const token = authHeader.substring(7)
    const payload = verifyAccessToken(token)

    const knex = getKnex()
    const user = await knex('users')
      .join('roles', 'users.role_id', 'roles.id')
      .where('users.id', payload.sub)
      .whereNull('users.deleted_at')
      .where('users.is_active', true)
      .select('users.id', 'users.email', 'users.name', 'roles.name as role_name')
      .first()

    if (user) {
      req.user = {
        sub: user.id,
        email: user.email,
        role: user.role_name as JWTPayload['role'],
        iat: payload.iat,
        exp: payload.exp,
        iss: payload.iss,
        aud: payload.aud,
      }
    }

    next()
  } catch {
    next()
  }
}