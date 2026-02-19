import { Router } from 'express'
import { auth } from '../../middlewares/auth.js'
import { requirePermissions } from '../../middlewares/requirePermissions.js'
import { validate } from '../../middlewares/validate.js'
import { asyncHandler } from '../../utils/asyncHandler.js'
import { createUserSchema, updateUserSchema, toggleUserSchema, listUsersSchema } from './users.schema.js'
import { createUserController, updateUserController, toggleUserController, listUsersController, getUserController } from './users.controller.js'

const router = Router()

router.get('/', auth, requirePermissions(['users:read']), validate(listUsersSchema), asyncHandler(listUsersController))
router.get('/:id', auth, requirePermissions(['users:read']), asyncHandler(getUserController))
router.post('/', auth, requirePermissions(['users:create']), validate(createUserSchema), asyncHandler(createUserController))
router.patch('/:id', auth, requirePermissions(['users:update']), validate(updateUserSchema), asyncHandler(updateUserController))
router.patch('/:id/active', auth, requirePermissions(['users:toggleActive']), validate(toggleUserSchema), asyncHandler(toggleUserController))

export default router
