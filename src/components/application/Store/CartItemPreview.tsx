"use client";

import clsx from "clsx";
import Button from "@/components/Button";
import CartItem from "./CartItem";
import { useCart } from "@/lib/zustand/useCart";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const CartItemPreview = () => {
  const [navbarHeight, setNavbarHeight] = useState<number | null>(null);
  const { showItemPreview, latestItem, toggleItemPreview } = useCart((state) => state);

  useEffect(() => {
    if (!showItemPreview) return;

    const navbar = document.getElementById("NAVBAR");
    if (!navbar) return;

    const navbarRect = navbar.getBoundingClientRect();

    setNavbarHeight(navbarRect.height);
  }, [showItemPreview, latestItem]);

  if (!showItemPreview || !latestItem) return null;

  return (
    <div
      className={clsx(
        "fixed right-6 z-30 border-[1px] w-[450px] border-t-0 border-black p-4 sm:right-0 sm:w-full sm:border-x-0 bg-white font-semibold",
        navbarHeight ? `top-[${navbarHeight}px]` : "top-0"
      )}
    >
      <div className="w-full flex items-center justify-between mb-2">
        <p className="text-lg">Just added</p>
        <button className="px-2 py-3 text-sm text-black" onClick={() => toggleItemPreview()}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      {!latestItem && (
        <p className="w-full text-center text-neutral-600 text-sm">Oops, no items to show here!</p>
      )}

      <CartItem item={latestItem} />

      <Link href="/checkout">
        <Button
          onClick={() => toggleItemPreview()}
          right={<FontAwesomeIcon icon={faCartShopping} />}
          className="w-full mt-6"
        >
          Go to checkout
        </Button>
      </Link>
    </div>
  );
};

export default CartItemPreview;
