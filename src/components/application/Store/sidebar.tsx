import { api } from "@/utils/api";
import { useFilter } from "@/lib/zustand/useFilter";

const Sidebar = () => {
  const {
    isLoading: typesLoading,
    data: typesData,
    isError: isTypesError,
    error: typesError,
  } = api.types.getTypes.useQuery();
  const { price, setPrice, clearFilter } = useFilter((state) => state);

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
            max="1000"
            className="w-full"
            value={price || 1000}
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
          <div className="flex items-center font-semibold text-black text-sm justify-between">
            <p>1$</p>
            <p>{price ? `${price}$` : "Maximum"}</p>
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
              <>
                {typesData.map((type, idx) => (
                  <div key={idx} className="flex items-center w-full justify-between">
                    <p>{type.name}</p>
                    <button>+</button>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
