"use client";

import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faChevronLeft,
  faChevronRight,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { Product, Type } from "@prisma/client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";

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
  const [activeImage, setActiveImage] = useState(0);

  const incrementImageIdx = () => {
    if (activeImage < (activeProduct?.images.length || 1) - 1) {
      setActiveImage(activeImage + 1);
    }
  };

  const decrementImageIdx = () => {
    if (activeImage > 0) {
      setActiveImage(activeImage - 1);
    }
  };

  useEffect(() => {
    setActiveImage(0);
  }, [activeProduct?.images]);

  if (!storeProduct && !adminProduct) {
    return <p>A client side error occurred. Please notify the owner!</p>;
  }

  return (
    <div
      style={{ width: "min(350px, 100%)" }}
      className="border-[1px] border-black font-semibold bg-white"
    >
      <div className="w-full relative">
        {activeProduct?.images.map((image, idx) => (
          <div
            className={clsx(
              "w-full h-[250px] transform transition-all duration-300 opacity-0 absolute top-0 left-0 scale-0",
              idx === activeImage && "relative !scale-100 opacity-100"
            )}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        ))}
        {!!activeProduct?.images.length && activeProduct.images.length > 1 && (
          <>
            <div className="w-full disabled:cursor-not-allowed top-1/2 transform -translate-y-1/2 absolute flex items-center justify-between px-2">
              <button
                className={clsx(
                  "h-[40px] opacity-70 enabled:hover:opacity-100 transition-all duration-300 w-[40px] flex justify-center items-center rounded-full bg-neutral-200 text-black disabled:!opacity-0"
                )}
                onClick={() => decrementImageIdx()}
                disabled={activeImage === 0}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                className={clsx(
                  "h-[40px] opacity-70 enabled:hover:opacity-100 transition-all duration-300 w-[40px] flex justify-center items-center rounded-full bg-neutral-200 text-black disabled:!opacity-0"
                )}
                onClick={() => incrementImageIdx()}
                disabled={activeImage === activeProduct?.images.length - 1}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              {Array.from(new Array(activeProduct?.images.length)).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={clsx(
                    "w-[10px] transition-all duration-300 h-[10px] rounded-full bg-neutral-200 opacity-70 hover:opacity-100",
                    idx === activeImage && "!opacity-100 !bg-neutral-800"
                  )}
                ></button>
              ))}
            </div>
          </>
        )}

        {!activeProduct?.images.length && (
          <p className="w-full text-center py-4 font-semibold text-neutral-600 text-sm">
            This product does not have images
          </p>
        )}
      </div>
      <div className="w-full flex items-center justify-between px-4 py-2 mt-2">
        <p className="text-lg">{activeProduct?.name || "Unspecified"}</p>
        <p className="text-sm">{activeProduct?.price || "Unspecified"}$</p>
      </div>
      <hr className="my-2" />
      <div className="flex items-center justify-between flex-wrap px-4 py-2 gap-4">
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
