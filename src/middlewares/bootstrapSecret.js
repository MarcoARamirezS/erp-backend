import { env } from '../config/env.js'

export function bootstrapSecret(req, res, next) {
  const secret = req.headers['x-bootstrap-secret']
  if (!secret || secret !== env.BOOTSTRAP_SECRET) {
    return next({ status: 401, message: 'Invalid bootstrap secret' })
  }
  next()
}
