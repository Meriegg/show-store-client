"use client";

import OrderDisplay from "./OrderDisplay";
import LoadingText from "@/components/LoadingText";
import { api } from "@/utils/api";

const OrderList = () => {
  const { isLoading, error, data } = api.admin.orders.getOrders.useQuery();

  return (
    <>
      {isLoading && !error && <LoadingText customLabel="Loading orders" />}
      {!isLoading && !error && (
        <div className="flex w-full flex-col gap-2">
          {data.map((order, idx) => (
            <OrderDisplay idx={idx} order={order} key={idx} />
          ))}
        </div>
      )}
    </>
  );
};
export default OrderList;
