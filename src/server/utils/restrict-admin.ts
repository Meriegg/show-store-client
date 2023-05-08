import type { AdminSession, AdminUser } from "@prisma/client"
import { TRPCError } from "@trpc/server"

type Session = AdminSession & {
  adminUser: AdminUser
}

export default (session: Session) => {
  if (session.adminUser.role !== "owner") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You do not have permission to execute this action."
    })
  }
}