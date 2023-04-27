import clsx from "clsx";
import type { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  errorMessage?: string;
  checkedMessage?: string;
  checkedMessageImportant?: boolean;
  label?: string;
}

const Radio = ({
  type,
  className,
  errorMessage,
  checkedMessage,
  label,
  checked,
  checkedMessageImportant,
  ...props
}: Props) => {
  return (
    <div className="flex flex-col gap-1 my-2">
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="radio"
          checked={checked}
          className={clsx(
            "relative ml-3 mr-2 h-5 w-5 appearance-none rounded-full border-[1px] border-solid border-neutral-200 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-red-500 checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-red-500 checked:after:bg-red-500 checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-red-500 checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#ef4444] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-200 dark:checked:border-red-500 dark:checked:after:border-red-500 dark:checked:after:bg-red-500 dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-red-500 dark:checked:focus:before:shadow-[0px_0px_0px_13px_#ef4444]",
            className
          )}
          {...props}
        />
        <div className="gap-1s flex flex-col text-neutral-900">
          {label && (
            <p
              className={clsx(
                "transition-all duration-300 text-sm text-neutral-600",
                errorMessage && "text-red-600"
              )}
            >
              {label}
            </p>
          )}
          {checkedMessage && checked && (
            <p
              className={clsx(
                "text-sm font-bold text-neutral-900",
                checkedMessageImportant && "text-red-600"
              )}
            >
              {checkedMessage}
            </p>
          )}
        </div>
      </div>
      {errorMessage && <p className="text-sm font-bold text-red-600">{errorMessage}</p>}
    </div>
  );
};

export default Radio;
