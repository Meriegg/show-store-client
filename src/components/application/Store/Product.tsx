"use client";

import Button from "@/components/Button";
import ImageCarousel from "@/components/ImageCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Product, Type } from "@prisma/client";

export type ProductWithTypes = {
  types: Type[];
} & Product;

export type AdminProduct = {
  name: string | null;
  price: number | null;
  images: string[];
  types: string[];
};

interface Props {
  storeProduct?: ProductWithTypes;
  adminProduct?: AdminProduct;
  adminDisplay?: boolean;
  bottomRightBtn?: "buy" | "edit";
}

const Product = ({ storeProduct, adminDisplay, adminProduct, bottomRightBtn = "buy" }: Props) => {
  const activeProduct = storeProduct || adminProduct;

  if (!storeProduct && !adminProduct) {
    return <p>A client side error occurred. Please notify the owner!</p>;
  }

  return (
    <div
      style={{ width: "min(350px, 100%)" }}
      className="border-[1px] border-black font-semibold bg-white"
    >
      <ImageCarousel
        withLink={storeProduct ? true : false}
        linkHref={storeProduct ? `/store/product/${storeProduct.id}` : undefined}
        imageLinks={activeProduct?.images || []}
        imageClassName="h-[250px]"
      />

      {!activeProduct?.images.length && (
        <p className="w-full text-center py-4 font-semibold text-neutral-600 text-sm">
          This product does not have images
        </p>
      )}
      <div className="w-full flex items-center justify-between px-4 py-2 mt-2">
        <p className="text-lg">{activeProduct?.name || "Unspecified"}</p>
        <p className="text-sm">{activeProduct?.price || "Unspecified"}$</p>
      </div>
      <hr className="my-2" />
      <div className="flex items-center justify-between flex-wrap px-4 pt-2 pb-4 gap-4">
        {storeProduct && (
          <div className="flex items-center gap-2 flex-wrap">
            {!!storeProduct.types.length && (
              <>
                <p className="text-neutral-600">types:</p>
                {storeProduct.types.map((type, idx) => (
                  <p key={idx}>@{type.name}</p>
                ))}
              </>
            )}
            {!storeProduct.types.length && !adminDisplay && (
              <p className="text-sm text-neutral-600">No types</p>
            )}
          </div>
        )}
        {adminDisplay && adminProduct && (
          <div className="flex items-center gap-2 flex-wrap">
            {!!adminProduct.types.length && (
              <>
                <p className="text-neutral-600">types:</p>
                {adminProduct.types.map((type, idx) => (
                  <p key={idx}>@{type}</p>
                ))}
              </>
            )}
            {!adminProduct.types.length && <p className="text-sm text-neutral-600">No types</p>}
          </div>
        )}
        {(bottomRightBtn === "buy" || !adminDisplay) && (
          <Button className="px-0 py-0 !w-[40px] !h-[40px]" disabled={adminDisplay}>
            <FontAwesomeIcon icon={faCartPlus} />
          </Button>
        )}
        {bottomRightBtn === "edit" && adminDisplay && storeProduct && (
          <Link href={`/admin/editProduct/${storeProduct.id}`}>
            <Button className="px-0 py-0 !w-[40px] !h-[40px]" variant="danger">
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Product;