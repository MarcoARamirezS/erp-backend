import { SuppliersRepo } from './suppliers.repository.js'

export async function createSupplier(data) {
  const now = Date.now()
  return SuppliersRepo.create({
    ...data,
    active: data.active ?? true,
    createdAt: now,
    updatedAt: now
  })
}

export async function updateSupplier(id, patch) {
  const s = await SuppliersRepo.getById(id)
  if (!s) throw { status: 404, message: 'Supplier not found' }
  await SuppliersRepo.update(id, patch)
}

export async function toggleSupplier(id, active) {
  const s = await SuppliersRepo.getById(id)
  if (!s) throw { status: 404, message: 'Supplier not found' }
  await SuppliersRepo.update(id, { active })
}

export async function listSuppliers(params) {
  return SuppliersRepo.list(params)
}
