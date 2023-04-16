"use client";

import clsx from "clsx";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Link from "next/link";

type BgPositions = "top" | "center" | "right" | "bottom";

interface Props {
  imageLinks: string[];
  imageClassName?: string;
  bgPos?: BgPositions | `${BgPositions} ${BgPositions}`;
  linkHref?: string;
  withLink?: boolean;
}

const ImageCarousel = ({
  imageLinks,
  imageClassName,
  withLink,
  linkHref,
  bgPos = "center",
}: Props) => {
  const [activeImage, setActiveImage] = useState(0);

  const incrementImageIdx = () => {
    if (activeImage < imageLinks.length - 1) {
      setActiveImage(activeImage + 1);
    }
  };

  const decrementImageIdx = () => {
    if (activeImage > 0) {
      setActiveImage(activeImage - 1);
    }
  };

  useEffect(() => {
    setActiveImage(0);
  }, [imageLinks]);

  return (
    <div className="w-full relative">
      {imageLinks.map((image, idx) => (
        <>
          {withLink && linkHref ? (
            <Link href={linkHref}>
              <div
                className={clsx(
                  "w-full transform transition-all duration-300 opacity-0 absolute top-0 left-0 scale-0",
                  imageClassName,
                  idx === activeImage && "relative !scale-100 opacity-100"
                )}
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: bgPos,
                }}
              ></div>
            </Link>
          ) : (
            <div
              className={clsx(
                "w-full transform transition-all duration-300 opacity-0 absolute top-0 left-0 scale-0",
                imageClassName,
                idx === activeImage && "relative !scale-100 opacity-100"
              )}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: bgPos,
              }}
            ></div>
          )}
        </>
      ))}
      {!!imageLinks.length && imageLinks.length > 1 && (
        <>
          <button
            className={clsx(
              "h-[40px] shadow-sm absolute top-1/2 transform -translate-y-1/2 left-4 opacity-70 enabled:hover:opacity-100 transition-all duration-300 w-[40px] flex justify-center items-center rounded-full bg-neutral-200 text-black disabled:!opacity-0"
            )}
            onClick={() => decrementImageIdx()}
            disabled={activeImage === 0}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className={clsx(
              "h-[40px] shadow-sm hover:shadow-md absolute top-1/2 transform -translate-y-1/2 right-4 opacity-70 enabled:hover:opacity-100 transition-all duration-300 w-[40px] flex justify-center items-center rounded-full bg-neutral-200 text-black disabled:!opacity-0"
            )}
            onClick={() => incrementImageIdx()}
            disabled={activeImage === imageLinks.length - 1}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
            {Array.from(new Array(imageLinks.length)).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={clsx(
                  "w-[10px] transition-all duration-300 h-[10px] rounded-full bg-neutral-200 opacity-70 hover:opacity-100",
                  idx === activeImage && "!opacity-100 !bg-neutral-800"
                )}
              ></button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
