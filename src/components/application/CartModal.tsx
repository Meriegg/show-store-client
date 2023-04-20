"use client";

import clsx from "clsx";
import CartItem from "./Store/CartItem";
import Button from "../Button";
import Link from "next/link";
import { faXmark, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "@/lib/zustand/useCart";

const CartModal = () => {
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
          <p className="w-full text-center text-sm text-neutral-600 font-semibold">
            You have no items
          </p>
        )}

        <div className="flex flex-col gap-6 grow overflow-y-scroll">
          {items.map((item, idx) => (
            <CartItem item={item} key={idx} />
          ))}
        </div>
        {!!items.length && (
          <div className="w-full">
            <Link href="/cart">
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
