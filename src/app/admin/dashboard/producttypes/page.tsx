"use client";

import LoadingText from "@/components/LoadingText";
import ProductType from "../../../../components/application/Admin/ProductTypes/Type";
import AddTypeModal from "@/components/application/Admin/ProductTypes/AddTypeModal";
import type { Type } from "../../../../components/application/Admin/ProductTypes/Type";
import { api } from "@/utils/api";

const ProductTypes = () => {
  const { isLoading, data, isError, error } = api.types.getTypes.useQuery();

  if (isLoading) {
    return <LoadingText />;
  }

  if (isError) {
    return <p>Oops, an error happened: {error?.message}</p>;
  }

  return (
    <div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-semibold text-neutral-900">Product Types</h1>
          <AddTypeModal />
        </div>
        <hr />
      </div>

      <div className="flex flex-col gap-6 mt-4 w-full">
        {!data.length && (
          <p className="w-full text-center text-neutral-600 font-semibold">
            You have no product types
          </p>
        )}

        {data.map((type, idx) => (
          <ProductType productType={type as Type} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default ProductTypes;
