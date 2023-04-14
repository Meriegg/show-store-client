import clsx from "clsx";
import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { type ReactNode } from "react";

export interface InputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  error?: string;
  label?: string;
  withAsterisk?: boolean;
  outerLeft?: ReactNode;
  outerRight?: ReactNode;
  innerLeft?: ReactNode;
  innerRight?: ReactNode;
  containerClassName?: string;
}

const Input = ({
  error,
  label,
  withAsterisk,
  className,
  outerLeft,
  outerRight,
  innerLeft,
  innerRight,
  containerClassName,
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <div className="flex gap-0 items-center font-semibold text-sm">
          <p>{label}</p>
          <p className="text-red-600">*</p>
        </div>
      )}
      <div className="flex items-center gap-2 w-full">
        {outerLeft}
        <div
          className={clsx(
            "text-sm text-neutral-900 border-[1px] border-neutral-100 rounded-lg transition-all duration-300 font-semibold w-full flex items-center gap-2",
            "outline-none focus-within:bg-neutral-50 focus-within:border-neutral-200",
            error && "bg-red-50 text-red-900 border-red-200",
            (innerLeft || innerRight) && "px-3",
            containerClassName
          )}
        >
          {innerLeft}
          <input
            className={clsx(
              "py-4 px-6 placeholder:text-neutral-500 outline-none w-full bg-transparent",
              (innerLeft || innerRight) && "!px-1",
              error && "placeholder:text-red-500",
              className
            )}
            style={{
              borderRadius: "inherit",
            }}
            {...props}
          />
          {innerRight}
        </div>
        {outerRight}
      </div>
      {error && <p className="text-red-500 font-semibold text-sm text-left">{error}</p>}
    </div>
  );
};

export default Input;
