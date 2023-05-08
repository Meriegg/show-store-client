"use client";

import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import LoadingText from "@/components/LoadingText";
import OrderStatusDisplay from "@/components/application/Admin/Orders/OrderStatusDisplay";
import PaymentModeDisplay from "@/components/application/Admin/Orders/PaymentModeDisplay";
import PaymentStatusDisplay from "@/components/application/Admin/Orders/PaymentStatusDisplay";
import { api } from "@/utils/api";
import formatOrderStatus from "@/utils/format-order-status";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OrderStatus } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const Order = () => {
  const router = useRouter();
  const params = useParams();
  const [newOrderStatus, setNewOrderStatus] = useState<OrderStatus | null>(null);
  const ctx = api.useContext();
  const { isLoading, error, data } = api.admin.orders.getOrder.useQuery({
    id: typeof params?.id === "object" ? params.id.join("") : params?.id || "",
  });
  const changeOrderStatus = api.admin.orders.changeOrderStatus.useMutation({
    onSuccess: () => {
      ctx.admin.orders.invalidate();
    },
  });
  const changeOrderPaymentStatus = api.admin.orders.changeOrderPaymentStatus.useMutation({
    onSuccess: () => {
      ctx.admin.orders.invalidate();
    },
  });
  const deleteOrder = api.admin.orders.deleteOrder.useMutation({
    onSuccess: () => {
      ctx.admin.orders.invalidate();
      router.push("/admin/dashboard/orders");
    },
  });

  if (isLoading) {
    return <LoadingText customLabel="Loading order" />;
  }

  if (error || !data) {
    return (
      <p className="text-sm w-full text-center font-semibold text-red-500">An error happened</p>
    );
  }

  return (
    <div className="sectionPadding">
      <Button
        left={<FontAwesomeIcon icon={faChevronLeft} />}
        size="small"
        variant="ghost"
        onClick={() => router.back()}
        className="w-fit"
      >
        Go back
      </Button>
      <h1 className="text-3xl font-semibold mt-3">Order details</h1>
      <p className="text-sm text-neutral-600 font-semibold">{data.id}</p>

      <div className="flex justify-between items-start flex-wrap gap-6">
        <div className="flex flex-col">
          <div className="flex flex-col gap-4 mt-6">
            <p className="text-lg font-semibold">Client details</p>

            <div className="flex items-start gap-4">
              <div className="flex flex-col font-semibold">
                <p className="text-neutral-600 text-sm">Full Name</p>
                <p>
                  {data.firstName} {data.lastName}
                </p>
              </div>
              <div className="flex flex-col font-semibold">
                <p className="text-neutral-600 text-sm">Email</p>
                <a href={`mailto:${data.email}`} className="text-blue-600 hover:underline">
                  {data.email}
                </a>
              </div>
              <div className="flex flex-col font-semibold">
                <p className="text-neutral-600 text-sm">Country</p>
                <p>{data.country}</p>
              </div>
              <div className="flex flex-col font-semibold">
                <p className="text-neutral-600 text-sm">Address</p>
                <p>{data.address}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-6">
            <p className="text-lg font-semibold">Order</p>

            <div className="flex items-start gap-4">
              <div className="flex flex-col font-semibold">
                <p className="text-neutral-600 text-sm">Total</p>
                <p>{data.orderTotal}$</p>
              </div>
              <div className="flex flex-col font-semibold">
                <p className="text-neutral-600 text-sm">Shipping price</p>
                <p>{data.timeOfOrderShippingPrice}$</p>
              </div>
              <div className="flex flex-col font-semibold">
                <p className="text-neutral-600 text-sm">Status</p>
                <OrderStatusDisplay status={data.orderStatus} />
              </div>
              <div className="flex flex-col font-semibold">
                <p className="text-neutral-600 text-sm">Payment Status</p>
                <PaymentStatusDisplay status={data.orderPaymentStatus} />
              </div>
              <div className="flex flex-col font-semibold">
                <p className="text-neutral-600 text-sm">Payment Mode</p>
                <PaymentModeDisplay paymentMode={data.paymentMode} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-6 font-semibold">
            <p className="text-lg font-semibold">Order actions</p>

            <div className="flex flex-col gap-2">
              <Dropdown<OrderStatus>
                options={[
                  { key: "In preparation", value: "in_preparation" },
                  { key: "In shipping", value: "in_shipping" },
                  { key: "Delivered", value: "delivered" },
                ]}
                shownValue={formatOrderStatus(newOrderStatus || data.orderStatus) || ""}
                setValue={(value) => setNewOrderStatus(value)}
                value={newOrderStatus || data.orderStatus}
                placeholder="New status"
              />
              <Button
                rounded="full"
                className="w-fit"
                disabled={newOrderStatus === null || newOrderStatus === data.orderStatus}
                loading={changeOrderStatus.isLoading}
                onClick={() => {
                  if (!newOrderStatus) return;

                  changeOrderStatus.mutate({
                    id: data.id,
                    status: newOrderStatus,
                  });
                }}
              >
                Change status
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                rounded="full"
                loading={changeOrderPaymentStatus.isLoading}
                onClick={() => {
                  changeOrderPaymentStatus.mutate({
                    id: data.id,
                    status: data.orderPaymentStatus === "paid" ? "unpaid" : "paid",
                  });
                }}
              >
                {data.orderPaymentStatus === "paid" ? "Set as unpaid" : "Set as paid"}
              </Button>
              <Button
                onClick={() => {
                  if (!confirm("Are you sure you want to delete this order?")) return;

                  deleteOrder.mutate({
                    id: data.id,
                  });
                }}
                loading={deleteOrder.isLoading}
                variant="danger"
                rounded="full"
              >
                Delete order
              </Button>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col gap-6"
          style={{
            width: "min(350px, 100%)",
          }}
        >
          <div className="flex flex-col gap-1 font-semibold w-full">
            <p className="text-xl">Order contents</p>
            {data.content.map((item, idx) => (
              <div className="flex w-full justify-between items-center gap-2 mt-4" key={idx}>
                <div className="flex flex-col">
                  <p>{item.product.name}</p>
                  <p className="text-sm text-neutral-600">Size {item.size}</p>
                </div>
                <div className="flex items-end flex-col">
                  <p className="text-sm text-red-500">
                    {item.quantity} item{item.quantity > 1 ? "s" : ""}
                  </p>
                  <p className="text-sm text-neutral-600">
                    {idx > 0 ? "+" : ""}{" "}
                    {parseFloat((item.product.price * item.quantity).toFixed(2))}$
                  </p>
                </div>
              </div>
            ))}
            <div className="w-full border-b-[1px] border-neutral-200"></div>
            <div className="flex flex-col items-end">
              <p>Total {data.orderTotal}$</p>
              <p className="text-sm text-neutral-600">Including shipping</p>
            </div>
          </div>

          <div className="flex flex-col font-semibold">
            <p className="text-neutral-600 text-sm">Extra address details</p>
            <p>{data.addressExtras || "No extra details were provided"}</p>
          </div>
          <div className="flex flex-col font-semibold">
            <p className="text-neutral-600 text-sm">Extra delivery details</p>
            <p>{data.extraDeliveryNotes || "No extra details were provided"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
