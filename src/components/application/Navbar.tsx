"use client";

import clsx from "clsx";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShop, faContactCard, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import Button from "../Button";

const Navbar = () => {
  const pathName = usePathname();

  const links = [
    { href: "/", text: "Home", icon: faHome },
    { href: "/store", text: "Store", icon: faShop },
    { href: "/contact", text: "Contact Us!", icon: faContactCard },
  ];

  return (
    <div className="flex items-center justify-between px-8 py-4 border-b-[1px] border-black">
      <div className="flex items-center gap-8">
        <div className="flex flex-col text-2xl items-center font-bold">
          <p className="logo-outline-text">SHOW</p>
          <div className="w-full h-[1px] bg-black"></div>
          <p>STORE</p>
        </div>
        <div className="flex items-center gap-6 md:hidden">
          {links.map((link, idx) => {
            console.log(pathName);

            return (
              <Link
                key={idx}
                href={link.href}
                className={clsx(
                  "font-semibold text-neutral-700 hover:text-black transition-all duration-300 text-sm flex items-center gap-2",
                  pathName === link.href && "!text-black"
                )}
              >
                {link.text}
                <FontAwesomeIcon className="w-4 h-4" icon={link.icon} />
              </Link>
            );
          })}
        </div>
      </div>
      <div>
        <Button size="small" right={<FontAwesomeIcon icon={faCartShopping} />}>
          Cart
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
