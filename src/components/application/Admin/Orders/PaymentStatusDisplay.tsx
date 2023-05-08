import { type OrderPaymentStatus } from "@prisma/client";
import clsx from "clsx";
import formatPaymentStatus from "../../../../utils/format-payment-status";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

interface Props {
  status: OrderPaymentStatus;
}

const PaymentStatusDisplay = ({ status }: Props) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-1",
        status === "unpaid" && "text-red-500",
        status === "paid" && "text-green-500"
      )}
    >
      <FontAwesomeIcon icon={status === "paid" ? faCheck : faExclamationCircle} />
      <p className="text-base">{formatPaymentStatus(status)}</p>
    </div>
  );
};

export default PaymentStatusDisplay;
