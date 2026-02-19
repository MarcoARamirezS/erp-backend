import { createRole, updateRole, listRoles } from './roles.service.js'

export async function createRoleController(req, res) {
  const role = await createRole(req.validated.body)
  res.status(201).json({ ok: true, role })
}

export async function updateRoleController(req, res) {
  await updateRole(req.validated.params.id, req.validated.body)
  res.json({ ok: true })
}

export async function listRolesController(req, res) {
  res.json({ ok: true, roles: await listRoles() })
}
