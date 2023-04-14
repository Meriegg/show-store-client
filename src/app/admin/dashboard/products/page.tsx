"use client";

import Button from "@/components/Button";
import LoadingText from "@/components/LoadingText";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "@/utils/api";
import Link from "next/link";

const Products = () => {
  const { isLoading, error, data, isError } = api.products.getProducts.useQuery();

  if (isLoading) {
    return <LoadingText />;
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold text-neutral-900">Products</h1>
        <Link href="/admin/addProduct">
          <Button right={<FontAwesomeIcon icon={faPlus} />}>Add product</Button>
        </Link>
      </div>
      <hr />
    </div>
  );
};

export default Products;
