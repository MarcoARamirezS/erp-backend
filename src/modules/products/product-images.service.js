import cloudinary from '../../config/cloudinary.js'
import { ProductsRepo } from './products.repository.js'

function uploadBufferToCloudinary({ buffer, folder }) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (err, result) => {
        if (err) return reject(err)
        resolve(result)
      }
    )
    stream.end(buffer)
  })
}

export async function uploadProductImage({ productId, file }) {
  if (!file?.buffer) throw { status: 400, message: 'Missing file (field: image)' }

  const product = await ProductsRepo.getById(productId)
  if (!product) throw { status: 404, message: 'Product not found' }

  const folder = `erp/products/${productId}`
  const uploaded = await uploadBufferToCloudinary({ buffer: file.buffer, folder })

  const image = {
    id: uploaded.public_id,
    url: uploaded.secure_url,
    width: uploaded.width,
    height: uploaded.height,
    format: uploaded.format,
    createdAt: Date.now()
  }

  const images = Array.isArray(product.images) ? product.images : []
  await ProductsRepo.update(productId, { images: [image, ...images] })

  return image
}

export async function deleteProductImage({ productId, imageId }) {
  const product = await ProductsRepo.getById(productId)
  if (!product) throw { status: 404, message: 'Product not found' }

  const images = Array.isArray(product.images) ? product.images : []
  const target = images.find((i) => i.id === imageId)
  if (!target) throw { status: 404, message: 'Image not found' }

  await cloudinary.uploader.destroy(imageId)

  const next = images.filter((i) => i.id !== imageId)
  await ProductsRepo.update(productId, { images: next })

  return { ok: true }
}
