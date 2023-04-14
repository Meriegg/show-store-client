"use client";

import AdminLineChart from "@/components/application/Admin/AdminLineChart";

import Button from "@/components/Button";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-semibold text-neutral-900">Overview</h1>
        </div>
        <hr />
      </div>
      <div className="mt-8 flex flex-col gap-4"></div>
      <AdminLineChart />
    </div>
  );
};

export default Dashboard;
