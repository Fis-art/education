import { Router } from 'express'
import { usersController } from './users.controller'
import { authenticate } from '@middlewares/authenticate'
import { authorize } from '@middlewares/authorize'
import { validate } from '@middlewares/validate'
import { createUserSchema, updateUserSchema, changeUserPasswordSchema, userQuerySchema } from './users.validator'

const router = Router()

router.use(authenticate)
router.use(authorize('super_admin'))

router.get('/', validate(userQuerySchema), usersController.getAll)
router.get('/roles', usersController.getRoles)
router.post('/', validate(createUserSchema), usersController.create)
router.get('/:id', usersController.getById)
router.put('/:id', validate(updateUserSchema), usersController.update)
router.put('/:id/password', validate(changeUserPasswordSchema), usersController.changePassword)
router.delete('/:id', usersController.delete)

export const usersRoutes = router