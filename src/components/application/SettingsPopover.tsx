"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { faCode, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Button from "../Button";
import Link from "next/link";

const SettingsPopover = () => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="w-[50px] h-[50px] bg-neutral-100 hover:bg-neutral-200 rounded-full hover:shadow-md transition-all duration-300 cursor-pointer z-30 text-lg text-neutral-700 fixed bottom-4 left-4">
          <FontAwesomeIcon icon={faGear} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 px-2 py-2">
        <Link href="/admin">
          <Button left={<FontAwesomeIcon icon={faCode} />} className="w-full" variant="ghost">
            Go to admin dashboard
          </Button>
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default SettingsPopover;
