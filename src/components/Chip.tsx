import clsx from "clsx";
import { VariantProps, cva } from "class-variance-authority";
import { ElementType, HTMLAttributes } from "react";

const chipStyles = cva(
  "transition-all duration-300 text-sm py-2 px-4 rounded-full flex items-center justify-center gap-2",
  {
    variants: {
      variant: {
        filled: "bg-black text-white",
        outline: "bg-transparent text-black outline outline-black",
      },
    },
    defaultVariants: {
      variant: "filled",
    },
  }
);

interface Props extends VariantProps<typeof chipStyles>, HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: React.ReactNode;
  containerStyles?: string;
}

const Chip = ({ as: Tag = "div", children, variant, containerStyles, ...props }: Props) => {
  return (
    <Tag className={clsx(chipStyles({ variant }), containerStyles)} {...props}>
      {children}
    </Tag>
  );
};

export default Chip;
