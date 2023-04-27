import clsx from "clsx";
import type { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {}

const TextArea = ({ className, ...props }: Props) => {
  return (
    <textarea
      className={clsx(
        "px-2 py-2 border-[1px] border-neutral-100 bg-neutral-50 rounded-md text-sm focus:outline-none",
        className
      )}
      {...props}
    />
  );
};

export default TextArea;
