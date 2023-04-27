"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();

  const adminRoutes = [
    { text: "Overview", href: "/admin/dashboard" },
    { text: "Orders", href: "/admin/dashboard/orders" },
    { text: "Product Types", href: "/admin/dashboard/producttypes" },
    { text: "Products", href: "/admin/dashboard/products" },
    { text: "Store Configs", href: "/admin/dashboard/storeConfig" },
  ];

  return (
    <div className="sectionPadding flex flex-col gap-6">
      <div className="flex items-center gap-2">
        {adminRoutes.map((route, idx) => {
          const isSelected = route.href === path;

          return (
            <Link
              key={idx}
              href={route.href}
              className={clsx(
                "transition-all duration-300 text-base px-6 py-4 rounded-md font-semibold enabled:hover:bg-neutral-100 ring-neutral-200 disabled:text-neutral-700 disabled:bg-neutral-200",
                isSelected && "bg-neutral-50 "
              )}
            >
              {route.text}
            </Link>
          );
        })}
      </div>
      {children}
    </div>
  );
};

export default Layout;
