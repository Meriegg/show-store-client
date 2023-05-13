import { z } from 'zod';
import { createTRPCRouter, adminProcedure, ownerProcedure } from "../../trpc";
import { TRPCError } from '@trpc/server';
import { StoreConfigSchema } from '@/lib/zod/schemas';

export const adminStoreConfigRouter = createTRPCRouter({
  createStoreConfig: ownerProcedure.input(StoreConfigSchema).mutation(async ({ ctx: { prisma, adminSession }, input: { isActive = false, ...input } }) => {
    let newConfig = await prisma.storeConfig.create({
      data: {
        isActive,
        ...input
      }
    });

    if (isActive) {
      await prisma.storeConfig.updateMany({
        data: {
          isActive: false
        }
      });

      const activeConfig = await prisma.storeConfig.update({
        where: {
          id: newConfig.id
        },
        data: {
          isActive: true
        }
      });

      newConfig = activeConfig;
    }

    return newConfig;
  }),
  updateStoreConfig: ownerProcedure.input(StoreConfigSchema.extend({ id: z.string() })).mutation(async ({ ctx: { prisma, adminSession }, input: { id, isActive = false, ...input } }) => {
    const updatedConfig = await prisma.storeConfig.update({
      where: {
        id
      },
      data: {
        isActive,
        ...input
      }
    });
    if (!updatedConfig) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "This config does not exist!"
      })
    }

    return updatedConfig;
  }),
  setStoreConfigAsActive: ownerProcedure.input(z.object({
    id: z.string()
  })).mutation(async ({ ctx: { prisma, adminSession }, input: { id } }) => {
    // Check if the config exists and that it's not already active
    const existingConfig = await prisma.storeConfig.findUnique({
      where: {
        id
      }
    });
    if (!existingConfig) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "This config does not exist!"
      })
    }

    if (existingConfig.isActive) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "This config is already active!"
      })
    }

    await prisma.storeConfig.updateMany({
      data: {
        isActive: false
      }
    });

    const activeStoreConfig = await prisma.storeConfig.update({
      where: {
        id
      },
      data: {
        isActive: true
      }
    });

    return activeStoreConfig;
  }),
  deleteConfig: ownerProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx: { prisma, adminSession }, input: { id } }) => {
    const allConfigs = await prisma.storeConfig.findMany();
    if (allConfigs.length <= 1) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You cannot delete the only store config!"
      })
    };

    const deletedConfig = await prisma.storeConfig.delete({
      where: {
        id
      }
    });

    // Avoid making another request to the database
    const makeActiveId = allConfigs.filter((config) => config.id !== id)[0].id;

    const newActiveConfig = await prisma.storeConfig.update({
      where: {
        id: makeActiveId
      },
      data: {
        isActive: true
      }
    });

    return { deletedConfig, newActiveConfig }
  }),
  getAllConfigs: adminProcedure.query(async ({ ctx: { prisma } }) => await prisma.storeConfig.findMany())
})