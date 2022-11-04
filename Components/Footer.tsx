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
      <div>
        <h6 style={{ fontSize: "0.875rem", textAlign: "center", margin: "0" }}>
          I DO NOT OWN ANY OF THE IMAGES DISPLAYED ON THIS SITE! THE IMAGES
          DISPLAYED ON THIS SITE ARE NOT USED FOR COMMERCIAL USE! PLEASE CONTACT
          ME AT mario.developer.contact@gmail.com IF YOU ARE THE OWNER AND WANT
          THEM TAKEN DOWN!
        </h6>
      </div>
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
