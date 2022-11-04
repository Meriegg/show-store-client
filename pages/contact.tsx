import styles from "@styles/Pages/Contact.module.scss";
import Link from "@components/Ui/Link";
import { useState } from "react";
// @ts-expect-error
import { CopyToClipboard } from "react-copy-to-clipboard";
import type { NextPage } from "next";

const Contact: NextPage = () => {
  const [didCopy, setDidCopy] = useState(false);

  const socialLinks = [
    { text: "instagram", link: "#" },
    { text: "facebook", link: "#" },
    { text: "twitter", link: "#" },
  ];

  return (
    <div className={styles.main}>
      <h1>You can contact us here (click mail to copy)</h1>

      <CopyToClipboard
        text={"someemail@example.com"}
        onCopy={() => {
          setDidCopy(true);

          setInterval(() => {
            setDidCopy(false);
          }, 2000);
        }}
      >
        <p className={styles.main_mainEmail}>
          {didCopy ? "Copied!" : "someemail@example.com"}
        </p>
      </CopyToClipboard>
      <div className={styles.socials}>
        <div data-separator></div>
        <div className={styles.socials_links}>
          {socialLinks.map((link, linkIdx) => (
            <Link key={linkIdx} href={link.link}>
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
