"use client";

import LoadingText from "@/components/LoadingText";
import { useRouter } from "next/navigation";

const Admin = () => {
  const router = useRouter();
  router.push("/admin/dashboard");

  return <LoadingText />;
};
export default Admin;
