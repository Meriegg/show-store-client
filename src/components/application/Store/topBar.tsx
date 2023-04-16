import Button from "@/components/Button";
import Link from "next/link";
import LinkGroup from "@/components/LinkGroup";
import { PRODUCT_MAX_PRICE } from "@/constants";
import { useFilter } from "@/lib/zustand/useFilter";

const StoreTopBar = () => {
  const { clearFilter, types, price } = useFilter((state) => state);

  return (
    <div className="border-b-[1px] border-black min-h-[100px] px-4 flex items-center justify-between">
      <div className="flex items-center gap-4 md:flex-col md:items-start md:py-6">
        <div className="flex gap-2 text-base font-semibold text-neutral-700">
          <LinkGroup
            links={[
              { text: "Home", href: "/" },
              { text: "Store", href: "/store" },
            ]}
          />
        </div>
        {types.length > 0 && (
          <div className="h-full flex items-center gap-2 flex-wrap">
            <div className="h-[40px] w-[1px] bg-black"></div>
            {types.map((type, idx) => (
              <p key={idx} className="font-semibold text-neutral-600">
                @{type}
              </p>
            ))}
          </div>
        )}
        {price
          ? price < PRODUCT_MAX_PRICE && (
              <div className="h-full flex items-center gap-2">
                <div className="h-[40px] w-[1px] bg-black"></div>
                <p className="font-semibold text-neutral-600">Everything below {price}$</p>
              </div>
            )
          : null}
      </div>

      <Button onClick={() => clearFilter()}>Clear filters</Button>
    </div>
  );
};

export default StoreTopBar;
