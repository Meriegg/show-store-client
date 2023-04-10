"use client";

import clsx from "clsx";
import { cva, VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

const buttonVariants = cva("font-semibold", {
  variants: {
    variant: {
      primary: "bg-blue-600 text-white",
    },
    size: {
      normal: "px-[30px] py-[15px] text-sm",
    },
    rounded: {
      small: "rounded-sm",
      normal: "rounded-[10px]",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "normal",
    rounded: "normal",
  },
});

interface Props
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

const Button = ({ children, className, variant, size, rounded, ...props }: Props) => {
  return (
    <button className={clsx(buttonVariants({ variant, size, rounded }), className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
