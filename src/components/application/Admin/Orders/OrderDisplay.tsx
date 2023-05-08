import Link from "next/link";
import PaymentModeDisplay from "./PaymentModeDisplay";
import OrderStatusDisplay from "./OrderStatusDisplay";
import { type Order } from "@prisma/client";
import PaymentStatusDisplay from "./PaymentStatusDisplay";

interface Props {
  order: Order;
  idx: number;
}

const OrderDisplay = ({ order, idx }: Props) => {
  return (
    <Link href={`/admin/order/${order.id}`} className="hover:opacity-70">
      <div className="flex items-center justify-between flex-wrap gap-4 px-6 py-4 bg-neutral-50 rounded-lg font-semibold mt-4">
        <div className="flex items-center gap-4 flex-wrap">
          <p className="font-semibold text-sm w-[70px] h-[35px] text-white flex items-center justify-center bg-black rounded-xl">
            #{idx + 1}
          </p>
          <div className="flex flex-col gap-0">
            <p className="text-sm text-neutral-600">Ordered By</p>
            <p className="text-base">
              {order.firstName} {order.lastName}
            </p>
          </div>
          <div className="flex flex-col gap-0">
            <p className="text-sm text-neutral-600">Address</p>
            <p className="text-base">{order.address}</p>
          </div>
          <div className="flex flex-col gap-0">
            <p className="text-sm text-neutral-600">Status</p>
            <OrderStatusDisplay status={order.orderStatus} />
          </div>
          <div className="flex flex-col gap-0">
            <p className="text-sm text-neutral-600">Payment Status</p>
            <PaymentStatusDisplay status={order.orderPaymentStatus} />
          </div>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex flex-col items-end gap-0">
            <p className="text-sm text-neutral-600">Payment Mode</p>
            <PaymentModeDisplay paymentMode={order.paymentMode} />
          </div>
          <div className="flex flex-col items-end gap-0">
            <p className="text-sm text-neutral-600">Total</p>
            <p className="text-base">{order.orderTotal}$</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default OrderDisplay;
