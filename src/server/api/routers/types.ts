import { z } from 'zod';
import { createTRPCRouter, publicProcedure, adminProcedure, ownerProcedure } from "../trpc";
import { TRPCError } from '@trpc/server';

export const typesRouter = createTRPCRouter({
  getTypes: publicProcedure.query(async ({ ctx: { prisma } }) => {
    const types = await prisma.type.findMany({
      include: {
        products: {
          include: {
            types: true
          }
        }
      }
    });

    return types;
  }),
  createType: ownerProcedure.input(z.object({
    name: z.string()
  })).mutation(async ({ ctx: { prisma, adminSession }, input: { name } }) => {
    const newType = await prisma.type.create({
      data: {
        name,
      }
    });

    return newType;
  }),
  deleteType: ownerProcedure.input(z.object({ id: z.string() })).
    mutation(async ({ ctx: { prisma, adminSession }, input: { id } }) => {
      const deletedType = await prisma.type.delete({
        where: {
          id
        }
      });
      if (!deletedType) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "This type does not exist!",
        })
      }

      return deletedType
    })
})