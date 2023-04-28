"use client";

import StoreProducts from "@/components/application/Store/StoreProducts";
import Sidebar, { MobileFilter } from "@/components/application/Store/sidebar";
import StoreTopBar from "@/components/application/Store/topBar";

const StorePage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col gap-2 w-full relative">
        <StoreTopBar />
        <StoreProducts />
        <MobileFilter />
      </div>
    </div>
  );
};

export default StorePage;
