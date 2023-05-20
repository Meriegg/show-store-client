import OrderList from "@/components/application/Admin/Orders/OrderList";

const Orders = () => {
  return (
    <div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full flex-wrap items-center justify-start">
          <h1 className="text-2xl font-semibold text-neutral-900">Orders</h1>
        </div>
        <hr />
      </div>
      <OrderList />
    </div>
  );
};

export default Orders;
