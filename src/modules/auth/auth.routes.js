import { Router } from 'express'
import { validate } from '../../middlewares/validate.js'
import { asyncHandler } from '../../utils/asyncHandler.js'
import { loginSchema, refreshSchema, logoutSchema } from './auth.schema.js'
import { loginController, refreshController, logoutController } from './auth.controller.js'

const router = Router()

router.post('/login', validate(loginSchema), asyncHandler(loginController))
router.post('/refresh', validate(refreshSchema), asyncHandler(refreshController))
router.post('/logout', validate(logoutSchema), asyncHandler(logoutController))

export default router
