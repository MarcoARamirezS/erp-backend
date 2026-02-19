import { z } from 'zod'

export const createSupplierSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email().optional(),
    phone: z.string().min(7).optional(),
    active: z.boolean().optional()
  })
})

export const updateSupplierSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    phone: z.string().min(7).optional()
  })
})

export const toggleSupplierSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({ active: z.boolean() })
})

export const listSuppliersSchema = z.object({
  query: z.object({
    limit: z.coerce.number().int().min(1).max(100).default(20),
    cursor: z.string().optional()
  })
})
