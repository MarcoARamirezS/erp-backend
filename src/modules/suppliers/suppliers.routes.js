import { Router } from 'express'
import { auth } from '../../middlewares/auth.js'
import { requirePermissions } from '../../middlewares/requirePermissions.js'
import { validate } from '../../middlewares/validate.js'
import { asyncHandler } from '../../utils/asyncHandler.js'
import { createSupplierSchema, updateSupplierSchema, toggleSupplierSchema, listSuppliersSchema } from './suppliers.schema.js'
import { createSupplierController, updateSupplierController, toggleSupplierController, listSuppliersController } from './suppliers.controller.js'

const router = Router()

router.get('/', auth, requirePermissions(['suppliers:read']), validate(listSuppliersSchema), asyncHandler(listSuppliersController))
router.post('/', auth, requirePermissions(['suppliers:create']), validate(createSupplierSchema), asyncHandler(createSupplierController))
router.patch('/:id', auth, requirePermissions(['suppliers:update']), validate(updateSupplierSchema), asyncHandler(updateSupplierController))
router.patch('/:id/active', auth, requirePermissions(['suppliers:toggleActive']), validate(toggleSupplierSchema), asyncHandler(toggleSupplierController))

export default router
