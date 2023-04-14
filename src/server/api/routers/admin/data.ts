import { createTRPCRouter, adminProcedure } from "../../trpc";

export const adminDataRouter = createTRPCRouter({
  me: adminProcedure.query(({ ctx: { adminSession } }) => adminSession)
})