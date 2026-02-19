import { z } from 'zod'

export const createRoleSchema = z.object({
  body: z.object({
    id: z.string().min(2),
    name: z.string().min(2),
    permissions: z.array(z.string()).default([])
  })
})

export const updateRoleSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({
    name: z.string().min(2).optional(),
    permissions: z.array(z.string()).optional()
  })
})
