import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Product, Type } from "@prisma/client";
import Button from "@/components/Button";

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
}

const Product = ({ storeProduct, adminDisplay, adminProduct }: Props) => {
  if (!storeProduct && !adminProduct) {
    return <p>A client side error occurred. Please notify the owner!</p>;
  }

  return (
    <div style={{ width: "min(350px, 100%)" }} className="border-[1px] border-black font-semibold">
      <img src={(storeProduct || adminProduct)?.images[0]} />
      <div className="w-full flex items-center justify-between px-4 py-2">
        <p className="text-lg">{(storeProduct || adminProduct)?.name || "Unspecified"}</p>
        <p className="text-sm">{(storeProduct || adminProduct)?.price || "Unspecified"}$</p>
      </div>
      <div className="w-full h-[1px] bg-black my-3"></div>
      <div className="flex items-center justify-between flex-wrap px-4 py-2">
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
        <Button className="px-0 py-0 !w-[45px] !h-[45px]" disabled={adminDisplay}>
          <FontAwesomeIcon icon={faCartPlus} />
        </Button>
      </div>
    </div>
  );
};

export default Product;
