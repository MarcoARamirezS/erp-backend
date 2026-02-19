import { Router } from 'express'
import { auth } from '../../middlewares/auth.js'
import { requirePermissions } from '../../middlewares/requirePermissions.js'
import { validate } from '../../middlewares/validate.js'
import { asyncHandler } from '../../utils/asyncHandler.js'
import { createRoleSchema, updateRoleSchema } from './roles.schema.js'
import { createRoleController, updateRoleController, listRolesController } from './roles.controller.js'

const router = Router()

router.get('/', auth, requirePermissions(['roles:read']), asyncHandler(listRolesController))
router.post('/', auth, requirePermissions(['roles:create']), validate(createRoleSchema), asyncHandler(createRoleController))
router.patch('/:id', auth, requirePermissions(['roles:update']), validate(updateRoleSchema), asyncHandler(updateRoleController))

export default router
