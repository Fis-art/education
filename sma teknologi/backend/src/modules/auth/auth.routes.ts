import { Router } from 'express'
import { authController } from './auth.controller'
import { authenticate } from '../../middlewares/authenticate'
import { validate } from '../../middlewares/validate'
import { loginSchema, changePasswordSchema } from './auth.validator'

const router = Router()

router.post('/login', validate(loginSchema), authController.login)
router.post('/refresh', authController.refresh)
router.post('/logout', authController.logout)
router.get('/me', authenticate, authController.me)
router.put('/change-password', authenticate, validate(changePasswordSchema), authController.changePassword)

export const authRoutes = router