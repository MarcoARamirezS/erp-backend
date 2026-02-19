import { Router } from 'express'
import { auth } from '../../middlewares/auth.js'
import { requirePermissions } from '../../middlewares/requirePermissions.js'
import { asyncHandler } from '../../utils/asyncHandler.js'
import { listPermissionsController } from './permissions.controller.js'

const router = Router()
router.get('/', auth, requirePermissions(['permissions:read']), asyncHandler(listPermissionsController))
export default router
