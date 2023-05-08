import formatOrderStatus from "@/utils/format-order-status";
import { type OrderStatus } from "@prisma/client";
import clsx from "clsx";

interface Props {
  status: OrderStatus;
}

const OrderStatusDisplay = ({ status }: Props) => {
  return (
    <div className="flex items-center gap-1">
      <div
        className={clsx(
          "w-[5px] h-[5px] rounded-full",
          status === "in_preparation" && "bg-red-500",
          status === "in_shipping" && "bg-green-500",
          status === "delivered" && "bg-neutral-600"
        )}
      ></div>
      <p
        className={clsx(
          "text-base",
          status === "in_preparation" && "text-red-500",
          status === "in_shipping" && "text-green-500",
          status === "delivered" && "text-neutral-600"
        )}
      >
        {formatOrderStatus(status)}
      </p>
    </div>
  );
};

export default OrderStatusDisplay;
