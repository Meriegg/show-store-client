import Button from "@/components/Button";
import Link from "next/link";
import { api } from "@/utils/api";

const Orders = () => {
  return (
    <div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-semibold text-neutral-900">Orders</h1>
          <Link href="/admin/dashboard/createOrder">
            <Button size="small">Add order manually</Button>
          </Link>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default Orders;
