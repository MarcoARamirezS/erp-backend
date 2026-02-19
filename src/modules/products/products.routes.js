import { Router } from 'express'
import { auth } from '../../middlewares/auth.js'
import { requirePermissions } from '../../middlewares/requirePermissions.js'
import { validate } from '../../middlewares/validate.js'
import { asyncHandler } from '../../utils/asyncHandler.js'
import { createProductSchema, updateProductSchema, toggleProductSchema, listProductsSchema } from './products.schema.js'
import {
  upload,
  createProductController,
  updateProductController,
  toggleProductController,
  listProductsController,
  getProductController,
  uploadProductImageController,
  deleteProductImageController
} from './products.controller.js'

const router = Router()

router.get('/', auth, requirePermissions(['products:read']), validate(listProductsSchema), asyncHandler(listProductsController))
router.get('/:id', auth, requirePermissions(['products:read']), asyncHandler(getProductController))
router.post('/', auth, requirePermissions(['products:create']), validate(createProductSchema), asyncHandler(createProductController))
router.patch('/:id', auth, requirePermissions(['products:update']), validate(updateProductSchema), asyncHandler(updateProductController))
router.patch('/:id/active', auth, requirePermissions(['products:toggleActive']), validate(toggleProductSchema), asyncHandler(toggleProductController))

router.post(
  '/:id/images',
  auth,
  requirePermissions(['products:uploadImage']),
  upload.single('image'),
  asyncHandler(uploadProductImageController)
)

router.delete(
  '/:id/images/:imageId',
  auth,
  requirePermissions(['products:deleteImage']),
  asyncHandler(deleteProductImageController)
)

export default router
