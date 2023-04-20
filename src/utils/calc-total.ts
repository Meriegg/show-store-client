import type { CartItem } from "@/lib/zustand/useCart";

export const calcItemTotal = (item: CartItem, toFixed?: number) => {
  return parseFloat((item.baseItem.price * item.quantity).toFixed(toFixed || 2))
}

export const calcCartTotal = (items: CartItem[], toFixed?: number) => {
  let total = 0;

  items.forEach((item) => {
    const itemTotal = calcItemTotal(item);

    total += itemTotal;
  });

  return parseFloat(total.toFixed(toFixed || 2))
}