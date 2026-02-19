import { RolesRepo } from './roles.repository.js'

export async function createRole(role) {
  const existing = await RolesRepo.getById(role.id)
  if (existing) throw { status: 409, message: 'Role already exists' }
  return RolesRepo.create(role)
}

export async function updateRole(id, patch) {
  const role = await RolesRepo.getById(id)
  if (!role) throw { status: 404, message: 'Role not found' }
  await RolesRepo.update(id, patch)
}

export async function listRoles() {
  return RolesRepo.list()
}
