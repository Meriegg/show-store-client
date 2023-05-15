"use client";

import { useState } from "react";
// @ts-expect-error
import { CopyToClipboard } from "react-copy-to-clipboard";

interface Props {
  card: {
    number: string;
    label: string;
  };
}

const CardNumber = ({ card }: Props) => {
  const [isCopied, setCopied] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <p className="italic">{card.label}</p>
      <p>-</p>
      <CopyToClipboard
        text={card.number}
        onCopy={() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 3500);
        }}
      >
        <button className="text-sm px-1 py-1 rounded-md bg-neutral-100 cursor-pointer hover:bg-neutral-200 transition-all duration-300">
          {isCopied ? "Copied!" : card.number}
        </button>
      </CopyToClipboard>
    </div>
  );
};
export default CardNumber;
