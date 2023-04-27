import { z } from 'zod'

export const StoreConfigSchema = z.object({
  isActive: z.boolean().optional(),
  name: z.string().optional(),
  shippingPrice: z.number(),
  homeHorizontalListItems: z.string().array().optional()
})