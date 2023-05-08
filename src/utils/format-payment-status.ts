import { type OrderPaymentStatus } from "@prisma/client";

export default (status: OrderPaymentStatus) => {
  switch (status) {
    case "paid":
      return "Order Paid";

    case "unpaid":
      return "Unpaid";

    default:
      return null;
  }
}