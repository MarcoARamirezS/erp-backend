import { z } from 'zod'

export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    name: z.string().min(2),
    password: z.string().min(6),
    roleIds: z.array(z.string()).default([])
  })
})

export const updateUserSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({
    name: z.string().min(2).optional(),
    roleIds: z.array(z.string()).optional()
  })
})

export const toggleUserSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({ active: z.boolean() })
})

export const listUsersSchema = z.object({
  query: z.object({
    limit: z.coerce.number().int().min(1).max(100).default(20),
    cursor: z.string().optional()
  })
})
