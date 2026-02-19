export const requirePermissions = (required = []) => (req, res, next) => {
  const current = new Set(req?.auth?.permissions || [])
  const missing = required.filter((p) => !current.has(p))
  if (missing.length) {
    return next({ status: 403, message: 'Forbidden - missing permissions', details: { missing } })
  }
  next()
}
