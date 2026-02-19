import multer from 'multer'
import { createProduct, updateProduct, toggleProduct, listProducts, getProduct } from './products.service.js'
import { uploadProductImage, deleteProductImage } from './product-images.service.js'

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
})

export async function createProductController(req, res) {
  res.status(201).json({ ok: true, product: await createProduct(req.validated.body) })
}

export async function updateProductController(req, res) {
  await updateProduct(req.validated.params.id, req.validated.body)
  res.json({ ok: true })
}

export async function toggleProductController(req, res) {
  await toggleProduct(req.validated.params.id, req.validated.body.active)
  res.json({ ok: true })
}

export async function listProductsController(req, res) {
  res.json({ ok: true, ...(await listProducts(req.validated.query)) })
}

export async function getProductController(req, res) {
  res.json({ ok: true, product: await getProduct(req.params.id) })
}

export async function uploadProductImageController(req, res) {
  const image = await uploadProductImage({ productId: req.params.id, file: req.file })
  res.json({ ok: true, image })
}

export async function deleteProductImageController(req, res) {
  const out = await deleteProductImage({ productId: req.params.id, imageId: req.params.imageId })
  res.json({ ok: true, ...out })
}
