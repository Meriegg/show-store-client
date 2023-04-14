import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";

const alertStyles = cva("text-base font-semibold px-4 py-3 rounded-md flex items-center my-4", {
  variants: {
    color: {
      danger: "bg-red-100 text-red-900",
      primary: "bg-neutral-100 text-black",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

export interface AlertProps extends VariantProps<typeof alertStyles> {
  label: string;
  right?: React.ReactNode;
  labelClassName?: string;
  containerClassName?: string;
}

const Alert = ({ label, right, labelClassName, containerClassName, color }: AlertProps) => {
  return (
    <div
      className={clsx(
        alertStyles({ color }),
        right ? "justify-between" : "justify-start",
        containerClassName
      )}
    >
      <p className={clsx("", labelClassName)}>{label}</p>
      {right}
    </div>
  );
};

export default Alert;
