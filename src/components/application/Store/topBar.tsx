import Button from "@/components/Button";
import Link from "next/link";
import { useFilter } from "@/lib/zustand/useFilter";

const StoreTopBar = () => {
  const { clearFilter } = useFilter((state) => state);

  return (
    <div className="border-b-[1px] border-black min-h-[100px] px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex gap-2 text-base font-semibold text-neutral-700">
          <Link href="/" className="hover:text-black hover:underline">
            Home
          </Link>
          <p>/</p>
          <p>Store</p>
        </div>
        <div className="h-full flex items-center gap-2">
          <div className="h-[30px] w-[1px] bg-black"></div>
          <p className="font-semibold text-neutral-600">@type</p>
        </div>
      </div>

      <Button onClick={() => clearFilter()}>Clear filters</Button>
    </div>
  );
};

export default StoreTopBar;
