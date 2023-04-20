"use client";

import Button from "@/components/Button";
import Link from "next/link";
import { useCart } from "@/lib/zustand/useCart";
import { calcCartTotal, calcItemTotal } from "@/utils/calc-total";
import { faCreditCard, faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CartItemsDisplay = () => {
  const router = useRouter();
  const { items, decreaseItemQuantity, increaseItemQuantity, removeItem } = useCart(
    (state) => state
  );

  useEffect(() => {
    if (!items.length) router.push("/store");
  }, []);

  return (
    <div className="mt-4 font-semibold">
      <p className="text-neutral-600">Your items</p>

      {!items.length && (
        <p className="text-center font-semibold text-sm w-full">You have no items in your cart!</p>
      )}
      {!!items.length && (
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <td>Product</td>
              <td>Quantity</td>
              <td>Total</td>
            </tr>
          </thead>

          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className="py-2">
                <td>
                  <div className="flex items-center gap-4">
                    <img className="h-[60px] rounded-md" src={item.baseItem.images[0]} />

                    <div className="flex flex-col">
                      <p>{item.baseItem.name}</p>
                      <p className="text-sm text-neutral-600">{item.size}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="border-[1px] border-black flex justify-between items-center gap-4 w-fit min-w-[200px]">
                    {item.quantity > 1 && (
                      <button
                        className="py-4 px-5 flex items-center justify-center"
                        onClick={() =>
                          decreaseItemQuantity({ id: item.baseItem.id, size: item.size })
                        }
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                    )}
                    {item.quantity <= 1 && (
                      <button
                        className="py-4 px-5 flex items-center justify-center hover:bg-red-50 text-red-900 rounded-r-md"
                        onClick={() => {
                          if (!confirm("Are you sure you want to remove this item?")) return;

                          removeItem({ id: item.baseItem.id, size: item.size });
                        }}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    )}
                    {item.quantity}
                    <button
                      className="py-4 px-5 flex justify-center items-center"
                      onClick={() =>
                        increaseItemQuantity({ id: item.baseItem.id, size: item.size })
                      }
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </td>
                <td>{calcItemTotal(item)}$</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <hr className="my-4" />

      <div className="w-full flex justify-end mt-4">
        <div className="flex flex-col items-end">
          <p className="text-lg text-neutral-600">Subtotal</p>
          <p className="text-3xl">{calcCartTotal(items)}$</p>
          <Link href="/checkout">
            <Button right={<FontAwesomeIcon icon={faCreditCard} />} className="mt-4">
              Proceed to checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartItemsDisplay;
