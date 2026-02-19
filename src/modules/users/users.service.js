import bcrypt from 'bcryptjs'
import { UsersRepo } from './users.repository.js'

export async function createUser({ email, name, password, roleIds }) {
  const existing = await UsersRepo.getByEmail(email)
  if (existing) throw { status: 409, message: 'Email already exists' }

  const passwordHash = await bcrypt.hash(password, 12)
  const now = Date.now()

  return UsersRepo.create({
    email,
    name,
    passwordHash,
    roleIds,
    active: true,
    createdAt: now,
    updatedAt: now
  })
}

export async function updateUser(id, patch) {
  const user = await UsersRepo.getById(id)
  if (!user) throw { status: 404, message: 'User not found' }
  await UsersRepo.update(id, patch)
}

export async function toggleUser(id, active) {
  const user = await UsersRepo.getById(id)
  if (!user) throw { status: 404, message: 'User not found' }
  await UsersRepo.update(id, { active })
}

export async function listUsers(params) {
  const out = await UsersRepo.list(params)
  // sanitiza hash
  out.items = out.items.map(({ passwordHash, ...u }) => u)
  return out
}

export async function getUser(id) {
  const user = await UsersRepo.getById(id)
  if (!user) throw { status: 404, message: 'User not found' }
  const { passwordHash, ...safe } = user
  return safe
}
