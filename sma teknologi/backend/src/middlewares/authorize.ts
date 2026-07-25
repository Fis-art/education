import { Request, Response, NextFunction } from 'express'
import { ForbiddenError } from '@shared/errors'

export const authorize = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new ForbiddenError('Tidak terautentikasi'))
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ForbiddenError('Akses ditolak: Peran tidak mencukupi'))
    }

    next()
  }
}

export const authorizePermission = (...permissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new ForbiddenError('Tidak terautentikasi'))
    }

    const userPermissions = req.user.permissions || []
    const hasPermission = permissions.some(p => userPermissions.includes(p))

    if (!hasPermission) {
      return next(new ForbiddenError('Akses ditolak: Izin tidak mencukupi'))
    }

    next()
  }
}

export const authorizeOwnerOrAdmin = (resourceUserIdParam = 'id') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new ForbiddenError('Tidak terautentikasi'))
    }

    if (req.user.role === 'super_admin' || req.user.role === 'admin') {
      return next()
    }

    const resourceUserId = req.params[resourceUserIdParam]
    if (req.user.sub !== resourceUserId) {
      return next(new ForbiddenError('Akses ditolak: Hanya pemilik data yang diperbolehkan'))
    }

    next()
  }
}