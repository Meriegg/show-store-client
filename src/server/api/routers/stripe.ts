import getCartTotal from "@/server/utils/get-cart-total";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

const ItemSchema = z.object({
  name: z.string(),
  price: z.number(),
  publicPriceNameVerificationKey: z.string(),
  verificationKey: z.string(),
  id: z.string()
})

export const CartSchema = z.object({
  baseItem: ItemSchema,
  size: z.string(),
  quantity: z.number()
}).array()

export const stripeRouter = createTRPCRouter({
  createPaymentIntent: publicProcedure
    .input(z.object({ items: CartSchema, shippingPrice: z.number() }))
    .mutation(async ({ ctx: { prisma, stripe }, input: { items, shippingPrice } }) => {
      const total = getCartTotal({ items, shippingPrice });
      if (!total.valid || !total.price) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "The items in your cart might not be valid!"
        })
      }

      const newPaymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(total.price * 100),
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true
        },
      });

      return newPaymentIntent.client_secret
    })
})