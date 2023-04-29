import verifySignedString from './verify-signed-string';
import { z } from 'zod';
import { CartSchema } from "../api/routers/stripe";

export default ({ items, shippingPrice = 0 }: { items: z.infer<typeof CartSchema>, shippingPrice?: number; }) => {
  let finalTotal = 0;

  for (let i = 0; i < items.length; i++) {
    const cartItem = items[i];
    const item = cartItem.baseItem;

    const linkedNamePrice = `${item.name}:${item.price}`;
    const isNamePriceLinkValid = verifySignedString(linkedNamePrice, item.verificationKey, item.publicPriceNameVerificationKey);
    if (!isNamePriceLinkValid) {
      return {
        valid: false,
        price: null
      }
    };

    finalTotal += item.price * cartItem.quantity
  };

  return {
    valid: true,
    price: parseFloat((finalTotal + shippingPrice).toFixed(2))
  }
}