"use client";

import LoadingText from "@/components/LoadingText";
import AdminLogin from "@/components/application/Admin/LoginForm";
import { api } from "@/utils/api";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isError } = api.admin.data.me.useQuery(undefined, {
    retry: 0,
  });

  if (isLoading) {
    return <LoadingText />;
  }

  if (isError) {
    return <AdminLogin />;
  }

  return <>{children}</>;
};

export default Layout;
