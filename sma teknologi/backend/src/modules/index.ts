import { Router } from 'express'
import { authRoutes } from '@modules/auth'
import { usersRoutes } from '@modules/users'
import { uploadRoutes } from '@modules/upload'
import { settingRoutes } from '@modules/setting'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', usersRoutes)
router.use('/upload', uploadRoutes)
router.use('/setting', settingRoutes)

router.get('/health', (_, res) => {
  res.json({ success: true, message: 'API is running', timestamp: new Date().toISOString() })
})

export const apiRoutes = router