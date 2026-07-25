import { Request, Response, NextFunction } from 'express'
import { usersService } from './users.service'
import { createUserSchema, updateUserSchema, changeUserPasswordSchema, userQuerySchema } from './users.validator'
import { authorize } from '@middlewares/authorize'

export class UsersController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await usersService.getAll(req.query as any)
      res.json({
        success: true,
        data: result.data,
        meta: result.meta,
      })
    } catch (error) {
      next(error)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await usersService.getById(req.params.id)
      res.json({
        success: true,
        data: user,
      })
    } catch (error) {
      next(error)
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await usersService.create(req.body)
      res.status(201).json({
        success: true,
        message: 'User berhasil dibuat',
        data: user,
      })
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await usersService.update(req.params.id, req.body)
      res.json({
        success: true,
        message: 'User berhasil diperbarui',
        data: user,
      })
    } catch (error) {
      next(error)
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await usersService.changePassword(req.params.id, req.body)
      res.json({
        success: true,
        message: 'Password berhasil diubah',
      })
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await usersService.delete(req.params.id)
      res.json({
        success: true,
        message: 'User berhasil dihapus',
      })
    } catch (error) {
      next(error)
    }
  }

  async getRoles(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const roles = await usersService.getRoles()
      res.json({
        success: true,
        data: roles,
      })
    } catch (error) {
      next(error)
    }
  }
}

export const usersController = new UsersController()