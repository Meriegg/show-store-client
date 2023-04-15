"use client";

import LoadingText from "@/components/LoadingText";
import Product from "@/components/application/Store/Product";
import Sidebar, { MobileFilter } from "@/components/application/Store/sidebar";
import StoreTopBar from "@/components/application/Store/topBar";
import { trpc } from "@/utils/trpc-provider";

const StorePage = () => {
  const { isLoading, data, isError, error } = trpc.products.getProducts.useQuery();

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col gap-2 w-full relative">
        <StoreTopBar />
        {!data?.length && <p>No products were found {":("}</p>}
        {isLoading && <LoadingText />}
        <p>{error?.message}</p>

        <div className="flex w-full p-4 flex-wrap justify-evenly">
          {!isLoading &&
            !isError &&
            data.map((product, idx) => <Product storeProduct={product} key={idx} />)}
        </div>

        <MobileFilter />
      </div>
    </div>
  );
};

export default StorePage;
