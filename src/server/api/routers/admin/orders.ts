import restrictAdmin from "@/server/utils/restrict-admin";
import { z } from "zod";
import { createTRPCRouter, adminProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";

export const orderRouter = createTRPCRouter({
  getOrders: adminProcedure.query(async ({ ctx: { prisma, adminSession } }) => {
    const orders = await prisma.order.findMany();

    return orders.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime())
  }),
  getOrder: adminProcedure.input(z.object({ id: z.string() })).query(async ({ ctx: { prisma }, input: { id } }) => {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        content: {
          include: {
            product: true,
          }
        }
      }
    })
    if (!order) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "This order either does not exist or has been deleted."
      })
    }

    return order;
  }),
  changeOrderStatus: adminProcedure.input(z.object({
    id: z.string(),
    status: z.union([z.literal("delivered"), z.literal("in_shipping"), z.literal("in_preparation")])
  })).mutation(async ({ ctx: { prisma, adminSession }, input: { id, status } }) => {
    restrictAdmin(adminSession)

    const modifiedOrder = await prisma.order.update({
      where: {
        id
      },
      data: {
        orderStatus: status
      }
    });
    if (!modifiedOrder) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "This order either does not exist or has been deleted."
      })
    }

    return modifiedOrder;
  }),
  changeOrderPaymentStatus: adminProcedure.input(z.object({
    id: z.string(),
    status: z.union([z.literal("paid"), z.literal("unpaid")])
  })).mutation(async ({ ctx: { prisma, adminSession }, input: { id, status } }) => {
    restrictAdmin(adminSession)
    const modifiedOrder = await prisma.order.update({
      where: {
        id
      },
      data: {
        orderPaymentStatus: status
      }
    });
    if (!modifiedOrder) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "This order either has been deleted or does not exist!"
      })
    };

    return modifiedOrder;
  }),
  deleteOrder: adminProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx: { prisma, adminSession }, input: { id } }) => {
    restrictAdmin(adminSession)

    const deletedOrder = await prisma.order.delete({
      where: {
        id
      }
    });
    if (!deletedOrder) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "This order either has been deleted or does not exist."
      })
    };

    return deletedOrder;
  })
})