import formatOrderPaymentMode from "@/utils/format-order-payment-mode";
import { faCreditCard, faLocationPinLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type OrderPaymentMode } from "@prisma/client";
import clsx from "clsx";

interface Props {
  paymentMode: OrderPaymentMode;
}

const PaymentModeDisplay = ({ paymentMode }: Props) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-1",
        paymentMode === "pay_on_delivery" && "text-red-500",
        paymentMode === "pay_online" && "text-green-500"
      )}
    >
      {paymentMode === "pay_on_delivery" ? (
        <FontAwesomeIcon icon={faLocationPinLock} />
      ) : (
        <FontAwesomeIcon icon={faCreditCard} />
      )}
      <p className="text-base">{formatOrderPaymentMode(paymentMode)}</p>
    </div>
  );
};
export default PaymentModeDisplay;
