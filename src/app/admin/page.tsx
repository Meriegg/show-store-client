"use client";

import { useRouter } from "next/navigation";

const Admin = () => {
  const router = useRouter();
  router.push("/admin/dashboard");

  return null;
};
export default Admin;
