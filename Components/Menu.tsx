import Link from "@components/Ui/Link";
import styles from "@styles/Components/Menu.module.scss";

interface Props {
  links: {
    text: string;
    link: string;
  }[];
  isActive: boolean;
  activeItemIdx: number | null;
  setActiveItemIdx: Function;
  setMenuOpen: Function;
}

const Menu = ({
  links,
  isActive,
  activeItemIdx,
  setActiveItemIdx,
  setMenuOpen,
}: Props) => {
  return (
    <div className={isActive ? styles.menu_open : styles.menu}>
      <nav>
        {links.map((item, itemIdx) => (
          <Link
            onClick={() => {
              setMenuOpen(false);
              setActiveItemIdx(itemIdx);
            }}
            href={item.link}
            data-active-page={activeItemIdx === itemIdx ? "true" : "false"}
            key={itemIdx}
          >
            {item.text}
          </Link>
        ))}
      </nav>
      <p className={styles.menu_credentials}>
        (c) 2022 - 2023 SHOW STORE. All rights reserved
      </p>
    </div>
  );
};

export default Menu;
