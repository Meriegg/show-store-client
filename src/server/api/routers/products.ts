import { createTRPCRouter, publicProcedure } from "../trpc";

export const productsRouter = createTRPCRouter({
  getProducts: publicProcedure.query(async ({ ctx: { prisma } }) => {
    const products = await prisma.product.findMany();

    return products;
  })
})