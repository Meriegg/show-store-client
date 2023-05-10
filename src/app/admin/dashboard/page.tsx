"use client";

import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  router.push("/admin/dashboard/orders");

  return <div></div>;
};

export default Dashboard;
