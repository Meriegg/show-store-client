import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { CartSchema } from "./stripe";
import getCartTotal from "@/server/utils/get-cart-total";
import { OrderDataSchema } from "@/lib/zod/schemas";
import { TRPCError } from "@trpc/server";
import createDbOrderItems from "@/server/utils/create-db-order-items";

export const ordersRouter = createTRPCRouter({
  createOrder: publicProcedure
    .input(z.object({ items: CartSchema, shippingPrice: z.number(), orderData: OrderDataSchema, setAsPaid: z.boolean().optional() }))
    .mutation(async ({ ctx: { prisma, stripe }, input: { items, shippingPrice, orderData, setAsPaid = false } }) => {
      const total = getCartTotal({ items, shippingPrice })
      if (!total.valid || !total.price) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Your items may be invalid."
        })
      }

      const dbOrder = await prisma.order.create({
        data: {
          ...orderData,
          orderTotal: total.price,
          timeOfOrderShippingPrice: shippingPrice,
          orderPaymentStatus: setAsPaid ? "paid" : "unpaid"
        }
      })

      const orderItems = await createDbOrderItems({ items, orderId: dbOrder.id });

      return dbOrder;
    }),
});
