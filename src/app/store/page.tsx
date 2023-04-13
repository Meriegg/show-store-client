"use client";

import { api } from "@/utils/api";

const StorePage = () => {
  const { isLoading, data, isError, error } = api.products.getProducts.useQuery();

  if (isLoading) {
    return <p>Loading</p>;
  }

  return <div>{!data?.length && <p>No products were found {":("}</p>}</div>;
};

export default StorePage;
