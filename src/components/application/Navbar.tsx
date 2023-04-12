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
import { useEffect, useState } from "react";

const Navbar = () => {
  const pathName = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [showNotchNavbar, setShowNotchNavbar] = useState(false);

  const links = [
    { href: "/", text: "Home", icon: faHome },
    { href: "/store", text: "Store", icon: faShop },
    { href: "/contact", text: "Contact Us!", icon: faContactCard },
  ];

  useEffect(() => {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = () => {
      let currentScrollPos = window.pageYOffset;

      if (prevScrollpos > currentScrollPos) {
        setHideNavbar(false);
      } else {
        setHideNavbar(true);
      }
      prevScrollpos = currentScrollPos;
    };
  }, []);

  return (
    <>
      <div
        className={clsx(
          "sticky top-0 z-20 transition-all duration-300 bg-neutral-200 opacity-70 rounded-br-full rounded-bl-full h-[10px] transform left-1/2 -translate-x-1/2",
          !hideNavbar && !showNotchNavbar ? "-translate-y-full" : "translate-y-0"
        )}
        style={{
          width: "min(450px, 100%)",
        }}
        onMouseEnter={() => setShowNotchNavbar(true)}
      ></div>
      <div
        className={clsx(
          "flex items-center transition-all duration-300 transform justify-between px-8 md:px-4 py-4 border-b-[1px] border-black sticky top-0 bg-white z-30",
          hideNavbar && !showNotchNavbar ? "-translate-y-full" : "translate-y-0"
        )}
        onMouseLeave={() => {
          setShowNotchNavbar(false);
        }}
      >
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
          <Button variant="ghost" right={<FontAwesomeIcon icon={faCartShopping} />}>
            Cart
          </Button>
        </div>
      </div>
      <Menu isOpen={isMenuOpen} setOpen={setMenuOpen} links={links} />
    </>
  );
};

export default Navbar;
