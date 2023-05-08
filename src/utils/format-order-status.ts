import { type OrderStatus } from "@prisma/client";

export default (status: OrderStatus) => {
  switch (status) {
    case "delivered":
      return "Delivered";

    case "in_preparation":
      return "In preparation";

    case "in_shipping":
      return "In shipping";

    default:
      return null;
  }
}