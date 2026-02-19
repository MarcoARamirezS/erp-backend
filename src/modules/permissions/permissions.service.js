import { PermissionsRepo } from './permissions.repository.js'
export async function listPermissions() {
  return PermissionsRepo.list()
}
