import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
  targetElement?: HTMLElement | null;
}

const Portal = ({ children, targetElement }: Props) => {
  if (typeof window === undefined || typeof document === undefined) return null;

  const rootNode = document.getElementById("__next");
  if (!rootNode) return null;

  return createPortal(children, targetElement || rootNode);
};

export default Portal;
