import { api } from "@/utils/api";
import { useFilter } from "@/lib/zustand/useFilter";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PRODUCT_MAX_PRICE } from "../../../constants";
import clsx from "clsx";

const Sidebar = () => {
  const {
    isLoading: typesLoading,
    data: typesData,
    isError: isTypesError,
    error: typesError,
  } = api.types.getTypes.useQuery();
  const { price, setPrice, types, addType, removeType } = useFilter((state) => state);

  return (
    <div
      className="flex flex-col border-r-[1px] border-black sticky left-0 top-0 h-[100vh]"
      style={{
        width: "min(250px, 100%)",
      }}
    >
      <div className="min-h-[100px] border-b-[1px] border-black flex items-center px-6">
        <p className="font-semibold text-black">Filter</p>
      </div>

      <div className="flex flex-col gap-4 px-4 py-8">
        <p className="font-semibold text-neutral-600 text-sm">price</p>

        <div className="flex flex-col gap-2 w-full">
          <input
            type="range"
            min="1"
            max={Math.round(PRODUCT_MAX_PRICE)}
            className="w-full"
            value={price || Math.round(PRODUCT_MAX_PRICE)}
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
          <div className="flex items-center font-semibold text-black text-sm justify-between">
            <p>1$</p>
            <p>{price ? `${price}$` : "Everything"}</p>
          </div>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-sm font-semibold text-neutral-600">Types</p>
          <div className="w-full">
            {typesLoading && <p>Loading</p>}
            {isTypesError && <p>{typesError.message}</p>}
            {!typesLoading && !isTypesError && !typesData.length && (
              <p>Could not find any types {":("}</p>
            )}
            {!typesLoading && !isTypesError && typesData.length && (
              <div className="flex flex-col gap-4 mt-4">
                {typesData.map((type, idx) => {
                  const typeIdx = types.findIndex((arrType) => arrType === type.name);
                  const isSelected = typeIdx !== -1;

                  return (
                    <div key={idx} className="flex items-center w-full justify-between">
                      <p className="font-semibold text-black">{type.name}</p>
                      <button
                        className="outline outline-black rounded-md p-[2px] transition-all duration-300 transform hover:scale-110"
                        onClick={() => {
                          if (isSelected) {
                            removeType(type.name);
                          } else {
                            addType(type.name);
                          }
                        }}
                      >
                        <div className="h-6 w-6 relative">
                          <FontAwesomeIcon
                            className={
                              (clsx(
                                "absolute top-1/2 left-1/2 transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2"
                              ),
                              isSelected ? "opacity-100 scale-100" : "opacity-0 scale-50")
                            }
                            icon={faXmark}
                          />
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
