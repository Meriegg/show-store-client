"use client";

import clsx from "clsx";
import Link from "next/link";
import Button from "../Button";
import Menu from "./Menu";
import Logo from "../Logo";
import OpenMenuBtn from "./OpenMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShop, faContactCard, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const pathName = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/", text: "Home", icon: faHome },
    { href: "/store", text: "Store", icon: faShop },
    { href: "/contact", text: "Contact Us!", icon: faContactCard },
  ];

  return (
    <>
      <div className="flex items-center justify-between px-8 md:px-4 py-4 border-b-[1px] border-black sticky top-0">
        <div className="flex items-center gap-8 md:gap-4">
          <OpenMenuBtn isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
          <Logo />
          <div className="flex items-center gap-6 md:hidden">
            {links.map((link, idx) => (
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
            ))}
          </div>
        </div>
        <div>
          <Button size="small" right={<FontAwesomeIcon icon={faCartShopping} />}>
            Cart
          </Button>
        </div>
      </div>
      <Menu isOpen={isMenuOpen} setOpen={setMenuOpen} links={links} />
    </>
  );
};

export default Navbar;
