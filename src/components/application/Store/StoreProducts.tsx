"use client";

import LoadingText from "@/components/LoadingText";
import Product from "./Product";
import { useFilter } from "@/lib/zustand/useFilter";
import { PRODUCT_MAX_PRICE } from "@/constants";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import type { ProductWithTypes } from "./Product";

const StoreProducts = () => {
  const { price: filterPrice, types: filterTypes } = useFilter(
    (state) => state
  );
  const [filteredItems, setFilteredItems] = useState<ProductWithTypes[] | null>(
    null
  );
  const { isLoading, data, isError, error } =
    api.products.getProducts.useQuery();

  useEffect(() => {
    if (
      (filterTypes.length === 0 &&
        (filterPrice === PRODUCT_MAX_PRICE || !filterPrice)) ||
      !data
    ) {
      setFilteredItems(null);
      return;
    }

    let tempArr: ProductWithTypes[] = [];

    // filter Products by price
    if (filterPrice) {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const itemAlreadyExists =
          tempArr.findIndex((arrItem) => arrItem.id === item.id) !== -1;
        if (itemAlreadyExists) continue;

        const isPriceOK = item.price <= filterPrice;
        if (!isPriceOK) continue;

        tempArr.push(item);
      }
    }

    // Filter products by type
    console.log(tempArr);
    const productsToBeFiltered =
      !filterPrice && tempArr.length <= 0 ? data : tempArr;
    console.log(productsToBeFiltered);
    if (filterTypes.length > 0) {
      let tempTypeFilter: ProductWithTypes[] = [];
      for (const type of filterTypes) {
        for (const product of productsToBeFiltered) {
          const hasMatchingType =
            product.types.findIndex((pType) => pType.name === type) !== -1;
          const alreadyExists =
            tempTypeFilter.findIndex(
              (aProduct) => aProduct.id === product.id
            ) !== -1;

          if (hasMatchingType && !alreadyExists) {
            tempTypeFilter.push(product);
          }
        }
      }

      tempArr = tempTypeFilter;
    }

    setFilteredItems(tempArr);
  }, [data, filterPrice, filterTypes]);

  return (
    <>
      {!data?.length && !isLoading && (
        <p className="text-center w-full text-sm font-semibold text-neutral-600">
          No products were found {":("}
        </p>
      )}
      {isLoading && <LoadingText />}
      <p>{error?.message}</p>

      {filteredItems !== null && !filteredItems.length && (
        <p className="w-full text-center text-sm font-semibold text-neutral-600">
          No products were found
        </p>
      )}

      <div className="flex gap-6 w-full p-4 flex-wrap justify-evenly">
        {!isLoading &&
          !isError &&
          (filteredItems || data).map((product, idx) => (
            <Product storeProduct={product} key={idx} />
          ))}
      </div>
    </>
  );
};
export default StoreProducts;
