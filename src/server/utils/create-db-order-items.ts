import { prisma } from '../db';
import { z } from 'zod';
import { CartSchema } from "../api/routers/stripe";

export default async ({ items, orderId }: { items: z.infer<typeof CartSchema>, orderId: string }) => {
  const dbItems = await prisma.productForOrder.createMany({
    data: items.map((item) => ({
      quantity: item.quantity,
      size: item.size,
      productId: item.baseItem.id,
      orderId
    }))
  })

  return dbItems;
}
