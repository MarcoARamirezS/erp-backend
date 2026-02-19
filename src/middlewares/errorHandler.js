import { env } from '../config/env.js'
import { logger } from '../config/logger.js'

export function errorHandler(err, req, res, next) {
  const status = err?.status || 500
  const message = err?.message || 'Internal Server Error'
  const details = err?.details

  if (env.NODE_ENV !== 'production') logger.error(err)

  res.status(status).json({
    ok: false,
    message,
    details,
    requestId: req.requestId
  })
}
