import { z } from 'zod'

export const createProductSchema = z.object({
  body: z.object({
    sku: z.string().min(2),
    name: z.string().min(2),
    description: z.string().optional(),
    price: z.coerce.number().min(0).optional(),
    supplierId: z.string().optional(),
    active: z.boolean().optional()
  })
})

export const updateProductSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({
    sku: z.string().min(2).optional(),
    name: z.string().min(2).optional(),
    description: z.string().optional(),
    price: z.coerce.number().min(0).optional(),
    supplierId: z.string().optional()
  })
})

export const toggleProductSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({ active: z.boolean() })
})

export const listProductsSchema = z.object({
  query: z.object({
    limit: z.coerce.number().int().min(1).max(100).default(20),
    cursor: z.string().optional(),
    skuPrefix: z.string().optional()
  })
})
