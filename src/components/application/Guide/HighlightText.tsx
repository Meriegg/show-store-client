import { ReactNode } from "react";

interface Props {
  children: string | ReactNode;
}

const HighlightText = ({ children }: Props) => {
  return <span className="px-2 py-1 bg-neutral-100 rounded-md">{children}</span>;
};

export default HighlightText;
