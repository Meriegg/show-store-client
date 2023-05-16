"use client";

import LoadingText from "@/components/LoadingText";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/utils/api";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const path = usePathname();
  const { isLoading, isError } = api.admin.data.me.useQuery(undefined, {
    retry: 0,
    onError: () => {
      router.push("/admin/login");
    },
  });

  if (isLoading) {
    return <LoadingText />;
  }

  if (isError && path !== "/admin/login") {
    return <LoadingText customLabel="Redirecting you to login page" />;
  }

  return <>{children}</>;
};

export default Layout;
