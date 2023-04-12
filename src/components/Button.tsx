"use client";

import clsx from "clsx";
import { cva, VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

const buttonVariants = cva(
  "font-semibold transition-all duration-300 transform active:scale-95 active:ring-4 flex items-center gap-2",
  {
    variants: {
      variant: {
        primary: "bg-black text-white ring-neutral-200",
        ghost:
          "outline-2 border-black text-black bg-transparent ring-neutral-200 hover:bg-black hover:text-white",
      },
      size: {
        normal: "px-6 py-2.5 text-sm",
        small: "text-xs px-5 py-2.5",
      },
      rounded: {
        small: "rounded-xs",
        normal: "rounded-md",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "normal",
      rounded: "normal",
    },
  }
);

interface Props
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
}

const Button = ({ children, left, right, className, variant, size, rounded, ...props }: Props) => {
  return (
    <button className={clsx(buttonVariants({ variant, size, rounded }), className)} {...props}>
      {left}
      {children}
      {right}
    </button>
  );
};

export default Button;
