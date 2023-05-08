import { type OrderPaymentMode } from "@prisma/client";

export default (paymentMode: OrderPaymentMode) => {
  switch (paymentMode) {
    case "pay_on_delivery":
      return "Pay on delivery";

    case "pay_online":
      return "Pay online";

    default:
      return null
  }
}