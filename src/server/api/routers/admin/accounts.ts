import * as argon from 'argon2'
import { z } from "zod";
import { createTRPCRouter, adminProcedure, ownerProcedure } from "../../trpc";
import { AdminAccountSchema } from '@/lib/zod/schemas';

export const adminAccountsRouter = createTRPCRouter({
  getAccounts: adminProcedure.query(async ({ ctx: { prisma } }) => {
    const accounts = await prisma.adminUser.findMany({
      include: {
        activeSessions: true
      }
    });

    for (let i = 0; i < accounts.length; i++) {
      const account = accounts[i];

      if (account.passwordType === "hashed") {
        account.password = account.password.replace(/.*/g, "•")
      }
    }

    return accounts;
  }),
  createAccount: ownerProcedure.input(AdminAccountSchema).mutation(async ({ ctx: { prisma }, input: { password, passwordType, ...input } }) => {
    const accPassword = passwordType === "public" ? password : await argon.hash(password, { saltLength: 16 })

    const newAccount = await prisma.adminUser.create({
      data: {
        password: accPassword,
        passwordType,
        ...input
      }
    });

    return newAccount;
  }),
  deleteAccount: ownerProcedure.input(z.object({
    id: z.string()
  })).mutation(async ({ ctx: { prisma }, input: { id } }) => {
    const deletedAccount = await prisma.adminUser.delete({
      where: {
        id
      }
    });

    return deletedAccount
  })
})