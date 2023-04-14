"use client";

import clsx from "clsx";
import Button from "@/components/Button";
import { useState } from "react";
import type { Type as ProductType } from "@prisma/client";
import { api } from "@/utils/api";

export type Type = {
  products: ProductType[];
} & ProductType;

interface Props {
  productType: Type;
}

const ProductType = ({ productType }: Props) => {
  const [showProducts, setShowProducts] = useState(false);
  const ctx = api.useContext();
  const deleteTypeMutation = api.types.deleteType.useMutation({
    onSuccess: () => {
      ctx.types.getTypes.invalidate();
    },
  });

  const deleteType = () => {
    if (!confirm("Are you sure you want to delete this type?")) return;

    deleteTypeMutation.mutate({ id: productType.id });
  };

  return (
    <div
      className={clsx(
        "font-semibold flex flex-col items-start gap-6 transition-all duration-300",
        showProducts && "p-4 bg-neutral-100 rounded-md"
      )}
    >
      <div className="flex items-center gap-6">
        <p className="text-lg">{productType.name}</p>
        <div className="flex items-center gap-2">
          <Button
            loading={deleteTypeMutation.isLoading}
            onClick={() => deleteType()}
            size="small"
            variant="danger"
          >
            Delete Type
          </Button>
          <Button size="small" onClick={() => setShowProducts(!showProducts)}>
            {showProducts ? "Hide Products" : "Show products"}
          </Button>
        </div>
      </div>

      {showProducts && (
        <div>
          {!productType.products?.length && (
            <p className="font-semibold text-neutral-600 text-center w-full">
              This type has no products yet!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductType;
