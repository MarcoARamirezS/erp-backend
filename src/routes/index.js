import { Router } from 'express'

import authRoutes from '../modules/auth/auth.routes.js'
import usersRoutes from '../modules/users/users.routes.js'
import rolesRoutes from '../modules/roles/roles.routes.js'
import permissionsRoutes from '../modules/permissions/permissions.routes.js'
import productsRoutes from '../modules/products/products.routes.js'
import suppliersRoutes from '../modules/suppliers/suppliers.routes.js'

import { bootstrapSecret } from '../middlewares/bootstrapSecret.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { runSeeds } from '../seeds/index.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', usersRoutes)
router.use('/roles', rolesRoutes)
router.use('/permissions', permissionsRoutes)
router.use('/products', productsRoutes)
router.use('/suppliers', suppliersRoutes)

/**
 * POST /api/bootstrap/seed
 * Header: x-bootstrap-secret: <BOOTSTRAP_SECRET>
 */
router.post('/bootstrap/seed', bootstrapSecret, asyncHandler(async (req, res) => {
  const out = await runSeeds()
  res.json({ ok: true, ...out })
}))

export default router
