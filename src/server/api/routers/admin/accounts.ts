import restrictAdmin from "@/server/utils/restrict-admin";
import { createTRPCRouter, adminProcedure } from "../../trpc";

export const adminAccountsRouter = createTRPCRouter({
  getAccounts: adminProcedure.query(async ({ ctx: { prisma } }) => {
    const accounts = await prisma.adminUser.findMany();

    for (let i = 0; i < accounts.length; i++) {
      const account = accounts[i];

      if (account.passwordType === "hashed") {
        account.password = account.password.replace(/.*/g, "•")
      }
    }

    return accounts;
  })
})