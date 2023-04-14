import { z } from "zod";
import { createTRPCRouter, adminProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";

export const orderRouter = createTRPCRouter({
  getOrders: adminProcedure.query(async ({ ctx: { prisma } }) => {
    return await prisma.order.findMany()
  }),
  getOrder: adminProcedure.input(z.object({ id: z.string() })).query(async ({ ctx: { prisma }, input: { id } }) => {
    const order = await prisma.order.findUnique({
      where: {
        id,
      }
    })
    if (!order) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Order does not exist!"
      })
    }

    return order;
  })
})