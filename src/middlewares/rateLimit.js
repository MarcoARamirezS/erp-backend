const bucket = new Map()

export function rateLimit({ windowMs = 60_000, max = 180 } = {}) {
  return (req, res, next) => {
    const key = req.ip
    const now = Date.now()
    const entry = bucket.get(key) || { count: 0, resetAt: now + windowMs }

    if (now > entry.resetAt) {
      entry.count = 0
      entry.resetAt = now + windowMs
    }

    entry.count += 1
    bucket.set(key, entry)

    if (entry.count > max) return next({ status: 429, message: 'Too many requests' })
    next()
  }
}
