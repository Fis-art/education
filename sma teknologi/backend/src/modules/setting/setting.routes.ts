import { Router } from 'express'
import { settingController } from './setting.controller'
import { authenticate } from '@middlewares/authenticate'
import { authorize } from '@middlewares/authorize'
import { validate } from '@middlewares/validate'
import { getSettingsSchema, updateSettingsSchema, settingParamSchema } from './setting.validator'

const router = Router()

router.get('/public', settingController.getPublic)

router.use(authenticate)

router.get('/', validate(getSettingsSchema), settingController.getAll)

router.use(authorize('super_admin', 'admin'))

router.get('/:key', validate(settingParamSchema), settingController.getByKey)
router.put('/', validate(updateSettingsSchema), settingController.bulkUpdate)
router.put('/:key', validate(settingParamSchema), settingController.update)

export const settingRoutes = router