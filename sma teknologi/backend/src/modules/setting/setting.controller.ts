import { Request, Response, NextFunction } from 'express'
import { settingService } from './setting.service'
import { validate } from '@middlewares/validate'
import { getSettingsSchema, updateSettingsSchema, settingParamSchema } from './setting.validator'
import { authorize } from '@middlewares/authorize'

export class SettingController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { group, is_public } = req.query as { group?: string; is_public?: string }
      const settings = await settingService.getAll(group, is_public === 'true')
      res.json({ success: true, data: settings })
    } catch (error) {
      next(error)
    }
  }

  async getPublic(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const settings = await settingService.getPublic()
      res.json({ success: true, data: settings })
    } catch (error) {
      next(error)
    }
  }

  async getByKey(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const setting = await settingService.getByKey(req.params.key)
      res.json({ success: true, data: setting })
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { key } = req.params
      const { value } = req.body
      const setting = await settingService.update(key, value)
      res.json({ success: true, message: 'Setting berhasil diperbarui', data: setting })
    } catch (error) {
      next(error)
    }
  }

  async bulkUpdate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updates = req.body as Array<{ key: string; value: string }>
      await settingService.bulkUpdate(updates)
      res.json({ success: true, message: 'Settings berhasil diperbarui' })
    } catch (error) {
      next(error)
    }
  }
}

export const settingController = new SettingController()