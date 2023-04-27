import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const storeConfigRouter = createTRPCRouter({
  getActiveStoreConfig: publicProcedure.query(async ({ ctx: { prisma } }) => {
    const activeStoreConfig = await prisma.storeConfig.findFirst({
      where: {
        isActive: true
      }
    });
    if (!activeStoreConfig) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "The store is not configured properly. Please contact the website owner about this problem!"
      })
    };

    return activeStoreConfig;
  }),
  getShippingPrice: publicProcedure.query(async ({ ctx: { prisma } }) => {
    const activeStoreConfig = await prisma.storeConfig.findFirst({
      where: {
        isActive: true
      }
    });
    if (!activeStoreConfig) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "The store is not configured properly. Please contact the website owner about this problem!"
      })
    };

    return activeStoreConfig.shippingPrice;
  })
})