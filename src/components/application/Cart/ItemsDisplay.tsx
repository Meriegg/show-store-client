"use client";

import Button from "@/components/Button";
import Link from "next/link";
import { useCart } from "@/lib/zustand/useCart";
import { calcCartTotal, calcItemTotal } from "@/utils/calc-total";
import { faCreditCard, faMinus, faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CartItemsDisplay = () => {
  const router = useRouter();
  const { items, decreaseItemQuantity, increaseItemQuantity, setItemQuantity, removeItem } =
    useCart((state) => state);

  useEffect(() => {
    if (!items.length) router.push("/store");
  }, []);

  return (
    <div className="flex flex-col mt-4 font-semibold w-full">
      <p className="text-neutral-600">Your items</p>

      {!items.length && (
        <p className="text-center font-semibold text-sm w-full">You have no items in your cart!</p>
      )}

      {!!items.length && (
        <table className="table-fixed overflow-x-scroll mt-4" cellSpacing="2rem">
          <thead>
            <tr>
              <td>
                <p className="text-sm text-neutral-600">Product</p>
              </td>
              <td>
                <p className="text-sm text-neutral-600">Quantity</p>
              </td>
              <td>
                <p className="text-sm text-neutral-600">Price</p>
              </td>
            </tr>
          </thead>

          <tbody className="px-4 py-2">
            {items.map((item, idx) => (
              <tr key={idx}>
                <td className="py-[1rem]">
                  <div className="flex items-center gap-4">
                    <img src={item.baseItem.images[0]} className="w-[85px] rounded-lg md:hidden" />
                    <div className="flex flex-col gap-1">
                      <p>{item.baseItem.name}</p>
                      <p className="text-sm text-neutral-600">size {item.size}</p>
                    </div>
                  </div>
                </td>

                <td className="h-fit">
                  <div className="border-[1px] h-[50px] w-fit">
                    {item.quantity <= 1 && (
                      <button
                        className="w-[60px] md:hidden text-neutral-500 hover:text-red-600 transition-all duration-300 h-full"
                        onClick={() => {
                          if (!confirm("Are you sure you want to remove this item?")) return;

                          removeItem({ id: item.baseItem.id, size: item.size });
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    )}

                    {item.quantity > 1 && (
                      <button
                        className="w-[60px] md:hidden text-neutral-500 hover:text-black transition-all duration-300 h-full"
                        onClick={() =>
                          decreaseItemQuantity({ id: item.baseItem.id, size: item.size })
                        }
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                    )}
                    <input
                      type="number"
                      pattern="[0-9]"
                      className="text-center h-full max-w-[100px] focus:outline-none"
                      value={item.quantity}
                      onChange={(e) => {
                        const inputNum = Math.round(parseFloat(e.target.value));
                        if (inputNum <= 0) return;

                        setItemQuantity({
                          id: item.baseItem.id,
                          size: item.size,
                          itemQuantity: !Number.isNaN(inputNum) ? inputNum : item.quantity,
                        });
                      }}
                    />
                    <button
                      className="w-[60px] md:hidden text-neutral-500 hover:text-black transition-all duration-300 h-full"
                      onClick={() =>
                        increaseItemQuantity({ id: item.baseItem.id, size: item.size })
                      }
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </td>
                <td>
                  <p className="text-black text-lg md:text-base">{calcItemTotal(item)}$</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CartItemsDisplay;
