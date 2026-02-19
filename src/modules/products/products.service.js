import { ProductsRepo } from './products.repository.js'

export async function createProduct(data) {
  const existing = await ProductsRepo.getBySku(data.sku)
  if (existing) throw { status: 409, message: 'SKU already exists' }

  const now = Date.now()
  return ProductsRepo.create({
    ...data,
    images: [],
    active: data.active ?? true,
    createdAt: now,
    updatedAt: now
  })
}

export async function updateProduct(id, patch) {
  const p = await ProductsRepo.getById(id)
  if (!p) throw { status: 404, message: 'Product not found' }
  await ProductsRepo.update(id, patch)
}

export async function toggleProduct(id, active) {
  const p = await ProductsRepo.getById(id)
  if (!p) throw { status: 404, message: 'Product not found' }
  await ProductsRepo.update(id, { active })
}

export async function listProducts(params) {
  return ProductsRepo.list(params)
}

export async function getProduct(id) {
  const p = await ProductsRepo.getById(id)
  if (!p) throw { status: 404, message: 'Product not found' }
  return p
}
