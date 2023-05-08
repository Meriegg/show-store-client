import { AdminRole } from "@prisma/client";

export default (role: AdminRole) => {
  switch (role) {
    case "local_admin":
      return "Local admin";

    case "owner":
      return "Owner";

    default:
      return null;
  }
}