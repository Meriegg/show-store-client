import { createTRPCRouter, publicProcedure } from "../trpc";

export const typesRouter = createTRPCRouter({
  getTypes: publicProcedure.query(async ({ ctx: { prisma } }) => {
    const types = await prisma.type.findMany();

    return types;
  })
})