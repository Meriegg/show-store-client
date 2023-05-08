"use client";

import Marquee from "react-fast-marquee";
import EditableText from "../demo/EditableText";
import clsx from "clsx";
import { api } from "@/utils/api";

const HomeExplore = () => {
  const { isLoading, isError, data } = api.storeConfig.getActiveStoreConfig.useQuery();

  const fallbackArray = Array.from(new Array(10)).map(() => "Item");

  return (
    <section
      id="explore"
      className="border-b-[1px] border-black sectionPadding flex flex-col items-start justify-center h-[100vh]"
    >
      <EditableText className="font-bold text-4xl" allowHTML>
        You Explore.
        <br /> We deliver
      </EditableText>

      <Marquee direction="right" className="mt-8">
        {(isLoading || isError ? fallbackArray : data.homeHorizontalListItems).map(
          (itemName, idx) => (
            <div
              key={idx}
              className={clsx(
                "px-14 py-4 flex items-center justify-center border-r border-y border-black",
                idx === 0 && "border-l"
              )}
            >
              <p>{itemName}</p>
            </div>
          )
        )}
      </Marquee>
      <p className="w-full text-right font-semibold text-sm text-neutral-600 mt-4">
        Items modifiable in Admin Panel!
      </p>
    </section>
  );
};
export default HomeExplore;
