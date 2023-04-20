import useDebounceValue from "@/hooks/use-debounce-value";
import { clsx } from "clsx";
import { useEffect, useState } from "react";

interface Props<T> {
  options: { key: string; value: T }[];
  setValue: (value: T) => void;
  value: T;
  shownValue: "WITH_KEY" | string;
  placeholder?: string;
  error?: string;
  hasSearch?: boolean;
  isFullWidth?: boolean;
}

const Dropdown = <T,>({
  options,
  setValue,
  value,
  shownValue,
  error,
  hasSearch,
  isFullWidth = true,
  placeholder = "Select a value",
}: Props<T>) => {
  const [isOpen, setOpen] = useState(false);
  const [finalOptions, setFinalOptions] = useState(options);
  const [searchQuery, setSearchQuery] = useState("");
  const lazySearchQuery = useDebounceValue(searchQuery, 150);

  useEffect(() => {
    if (!searchQuery) {
      setFinalOptions(options);
      return;
    }

    setFinalOptions(
      options.filter((option) => option.key.toLowerCase().includes(lazySearchQuery.toLowerCase()))
    );
  }, [lazySearchQuery]);

  return (
    <div className={clsx("relative text-sm", isFullWidth ? "w-full" : "w-fit")}>
      <button
        type="button"
        className={clsx(
          "flex w-full items-center justify-between gap-2 rounded-full bg-neutral-50 px-[25px] py-[15px] text-neutral-700",
          value && "!text-neutral-900",
          error && "border-2 border-red-200 bg-red-50 text-red-900"
        )}
        onClick={() => setOpen(!isOpen)}
      >
        {shownValue || placeholder}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={clsx("h-5 w-5 transform transition-all duration-300", isOpen && "rotate-90")}
        >
          <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {error && <p className="w-full text-left text-red-900">{error}</p>}
      <div
        className={clsx(
          "absolute left-0 top-8 -z-10 flex max-h-[350px] w-full min-w-fit flex-col gap-1 overflow-y-scroll rounded-lg bg-neutral-50 px-2 opacity-0 shadow-lg transition-all duration-300",
          isOpen && "!top-16 !z-10 !opacity-100",
          hasSearch ? "pt-0 pb-2" : "py-2"
        )}
      >
        {hasSearch && (
          <div className="w-full sticky top-0 bg-neutral-50 pt-2 px-1">
            <div className="flex items-center gap-1 text-neutral-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>

              <input
                placeholder="Search"
                className="flex-grow bg-transparent py-3 px-3 text-neutral-900 placeholder:text-neutral-700"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
            </div>
            <hr />
          </div>
        )}
        {finalOptions.map((option, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setOpen(false);
              setValue(option.value);
            }}
            className="rounded-md px-4 py-4 text-left hover:bg-neutral-100 active:bg-neutral-200"
          >
            {option.key}
          </button>
        ))}
        {!finalOptions.length && (
          <p className="text-sm text-center text-neutral-600 mt-2">There are no results {":("}</p>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
