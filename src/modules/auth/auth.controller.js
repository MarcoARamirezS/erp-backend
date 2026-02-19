import { login, refresh, logout } from './auth.service.js'

export async function loginController(req, res) {
  const { email, password } = req.validated.body
  res.json({ ok: true, ...(await login({ email, password })) })
}

export async function refreshController(req, res) {
  const { refreshToken } = req.validated.body
  res.json({ ok: true, ...(await refresh({ refreshToken })) })
}

export async function logoutController(req, res) {
  const { refreshToken } = req.validated.body
  res.json({ ok: true, ...(await logout({ refreshToken })) })
}
