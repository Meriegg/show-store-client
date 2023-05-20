"use client";

import clsx from "clsx";
import CartItem from "./Store/CartItem";
import Button from "../Button";
import Link from "next/link";
import { api } from "@/utils/api";
import { faXmark, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "@/lib/zustand/useCart";
import { calcCartTotal } from "@/utils/calc-total";
import LoadingText from "../LoadingText";

const CartModal = () => {
  const { isLoading, error, data, isError } = api.storeConfig.getShippingPrice.useQuery();
  const { isOpen, toggleOpen, items } = useCart((state) => state);

  return (
    <div
      className={clsx(
        "transition-all duration-300 flex justify-end items-start fixed top-0 left-0 h-full w-full bg-modal-transparent-black",
        isOpen ? "z-40 opacity-100" : "-z-20 opacity-0"
      )}
    >
      <div
        className={clsx(
          "h-full bg-white transform transition-all flex flex-col justify-start duration-300 p-4 gap-2",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{
          width: "min(400px, 100%)",
        }}
      >
        <div className="w-full flex items-center justify-between">
          <p className="text-lg font-semibold">Cart</p>
          <button className="p-4" onClick={() => toggleOpen()}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {!items.length && (
          <div className="flex h-full items-center justify-center">
            <p className="w-full text-center text-sm text-neutral-600 font-semibold">
              You have no items
            </p>
          </div>
        )}

        {!!items.length && (
          <div className="flex flex-col gap-6 grow overflow-y-auto">
            {items.map((item, idx) => (
              <CartItem item={item} key={idx} />
            ))}
          </div>
        )}
        {!!items.length && (
          <div className="w-full flex-col gap-2 font-semibold">
            {isLoading && !data && <LoadingText customLabel="Calculating total" />}
            {(isError || error) && (
              <p className="text-sm my-2 text-red-500">Could not calculate price</p>
            )}
            {!isLoading && !isError && !error && (
              <div className="flex flex-col border-t-[1px] border-neutral-200 py-2">
                <div className="flex w-full items-center justify-between text-sm">
                  <p className="text-neutral-600">Subtotal: </p>
                  <p className="text-base">{calcCartTotal(items)}$</p>
                </div>
                <p className="text-red-500 w-full text-right text-sm">
                  +{data.toString()}$ shipping
                </p>
                <div className="border-t-[1px] border-neutral-200 my-1"></div>
                <div className="w-full flex justify-between items-center">
                  <p className="text-sm text-neutral-600">Total: </p>
                  <p>{parseFloat((calcCartTotal(items) + data).toFixed(2))}$</p>
                </div>
              </div>
            )}
            <Link href="/checkout">
              <Button
                onClick={() => toggleOpen()}
                right={<FontAwesomeIcon icon={faCartShopping} />}
                className="w-full"
              >
                Go to Checkout
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
