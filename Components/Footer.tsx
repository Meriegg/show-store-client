import Link from "./Ui/Link";
import styles from "@styles/Components/Footer.module.scss";

const Footer = () => {
  const links = [
    { text: "Legal Stuff", href: "/#" },
    { text: "Contact", href: "/contact" },
    { text: "FAQ", href: "/#" },
    { text: "Store", href: "/store" },
  ];

  return (
    <footer className={styles.footer}>
      <p>(c) 2022 SHOW STORE - all rights reserved.</p>
      <div className={styles.footer_links}>
        {links.map((link, linkIdx) => (
          <Link href={link.href} key={linkIdx}>
            {link.text}
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
