import Link from "./Ui/Link";
import styles from "@styles/Components/Navbar.module.scss";
import Logo from "./Ui/Logo";
import OpenMenuBtn from "./OpenMenuBtn";
import Menu from "./Menu";
import { setCartMenuState } from "@rootDir/redux/cart/cartSlice";
import { RootState } from "@rootDir/types";
import { useDispatch, useSelector } from "react-redux";
import { Cart } from "react-ionicons";
import { ButtonOutline } from "./Ui/Button";
import { useState } from "react";

const Navbar = () => {
  const [activeItemIdx, setActiveItemIdx] = useState<number | null>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const cartState = useSelector((root: RootState) => root.cartSlice.value);
  const dispatch = useDispatch();

  const links = [
    { text: "Home", link: "/" },
    { text: "Store", link: "/store" },
    { text: "About Us", link: "#" },
    { text: "Contact Us", link: "/contact" },
  ];

  return (
    <>
      <div className={styles.navContainer}>
        <div className={styles.left}>
          <OpenMenuBtn isActive={isMenuOpen} setActive={setMenuOpen} />
          <Logo />

          <nav>
            {links.map((item, itemIdx) => (
              <Link
                onClick={() => setActiveItemIdx(itemIdx)}
                href={item.link}
                data-active-page={activeItemIdx === itemIdx ? "true" : "false"}
                key={itemIdx}
              >
                {item.text}
              </Link>
            ))}
          </nav>
        </div>
        <div className={styles.right}>
          <ButtonOutline
            style={{ padding: "5px 20px" }}
            onClick={() =>
              dispatch(setCartMenuState({ val: !cartState.isCartMenuOpen }))
            }
          >
            cart
            <Cart
              cssClasses={styles.right_cartIcon}
              title={"Cart Icon"}
              height={"20px"}
              width={"20px"}
            />
          </ButtonOutline>
        </div>
      </div>
      <Menu
        links={links}
        activeItemIdx={activeItemIdx}
        isActive={isMenuOpen}
        setMenuOpen={setMenuOpen}
        setActiveItemIdx={setActiveItemIdx}
      />
    </>
  );
};

export default Navbar;
