import { z } from 'zod'

export const StoreConfigSchema = z.object({
  isActive: z.boolean().optional(),
  name: z.string().optional(),
  shippingPrice: z.number(),
  homeHorizontalListItems: z.string().array().optional()
})


export const OrderDataSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  address: z.string(),
  addressExtras: z.string().optional(),
  email: z.string(),
  country: z.string(),
  extraDeliveryNotes: z.string().optional(),
  paymentMode: z.union([z.literal("pay_on_delivery"), z.literal("pay_online")]),
});
