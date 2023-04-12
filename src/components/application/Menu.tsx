import clsx from "clsx";
import Logo from "../Logo";
import Link from "next/link";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { usePathname } from "next/navigation";

interface Props {
  isOpen: boolean;
  setOpen: (input: boolean) => void;
  links: {
    href: string;
    text: string;
    icon: IconDefinition;
  }[];
}

const Menu = ({ isOpen, setOpen, links }: Props) => {
  const pathName = usePathname();

  return (
    <div
      className={clsx(
        "transition-all z-40 bg-white fixed top-0 left-0 w-full h-full transform hidden md:block",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="absolute left-0 top-0 p-4 flex items-center justify-between w-full">
        <Logo />
        <button onClick={() => setOpen(false)}>
          <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-col gap-6 w-full items-center mt-32">
        {links.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className={clsx(
              "font-semibold text-neutral-700 hover:text-black transition-all duration-300 text-lg flex items-center gap-2",
              pathName === link.href && "!text-black"
            )}
          >
            {link.text}
            <FontAwesomeIcon className="w-4 h-4" icon={link.icon} />
          </Link>
        ))}
      </div>

      <p className="absolute bottom-4 font-semibold text-neutral-600 text-sm w-full text-center px-2">
        &copy; 2023 - All rights reserved.
      </p>
    </div>
  );
};

export default Menu;
