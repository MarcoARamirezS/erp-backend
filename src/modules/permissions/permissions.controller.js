import { listPermissions } from './permissions.service.js'
export async function listPermissionsController(req, res) {
  res.json({ ok: true, permissions: await listPermissions() })
}
