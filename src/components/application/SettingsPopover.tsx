"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { faCode, faEnvelope, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { GITHUB_LINK, EMAIL_LINK, INSTAGRAM_LINK } from "@mariodev14/socials";
import Button from "../Button";
import Link from "next/link";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";

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
      <PopoverContent className="w-80 px-2 py-4 font-semibold flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="flex-grow border-t-[1px] border-neutral-200"></div>
          <p className="w-fit text-sm text-neutral-800">Admin</p>
          <div className="flex-grow border-t-[1px] border-neutral-200"></div>
        </div>
        <Link href="/admin">
          <Button left={<FontAwesomeIcon icon={faCode} />} className="w-full" variant="ghost">
            Go to admin dashboard
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex-grow border-t-[1px] border-neutral-200"></div>
          <p className="w-fit text-sm text-neutral-800">Contact me</p>
          <div className="flex-grow border-t-[1px] border-neutral-200"></div>
        </div>
        <div className="flex items-center gap-4 justify-center flex-wrap">
          <a
            href={EMAIL_LINK}
            className="text-lg text-neutral-600 hover:text-neutral-900 flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <span className="text-sm">Email</span>
          </a>
          <a
            href={GITHUB_LINK}
            className="text-lg text-neutral-600 hover:text-neutral-900 flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faGithub} />
            <span className="text-sm">Github</span>
          </a>
          <a
            href={INSTAGRAM_LINK}
            className="text-lg text-neutral-600 hover:text-neutral-900 flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faInstagram} />
            <span className="text-sm">Instagram</span>
          </a>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SettingsPopover;
