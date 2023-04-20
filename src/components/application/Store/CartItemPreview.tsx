"use client";

import clsx from "clsx";
import Button from "@/components/Button";
import CartItem from "./CartItem";
import { useCart } from "@/lib/zustand/useCart";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

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
      {!latestItem && (
        <p className="w-full text-center text-neutral-600 text-sm">Oops, no items to show here!</p>
      )}

      <CartItem item={latestItem} />

      <Button
        right={<FontAwesomeIcon icon={faXmark} />}
        className="w-full mt-4"
        onClick={() => toggleItemPreview()}
      >
        Close this
      </Button>
    </div>
  );
};

export default CartItemPreview;
