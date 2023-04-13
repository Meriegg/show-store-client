"use client";

import Sidebar from "@/components/application/Store/sidebar";
import StoreTopBar from "@/components/application/Store/topBar";
import { trpc } from "@/utils/trpc-provider";

const StorePage = () => {
  const { isLoading, data, isError, error } = trpc.products.getProducts.useQuery();

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col gap-2 w-full">
        <StoreTopBar />
        {!data?.length && <p>No products were found {":("}</p>}
        {isLoading && <p>Loading</p>}
        <p>{error?.message}</p>
      </div>
    </div>
  );
};

export default StorePage;
