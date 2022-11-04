import NextLink from "next/link";
import styles from "@styles/Components/Ui/Link.module.scss";
import { ReactNode, DetailedHTMLProps, AnchorHTMLAttributes } from "react";

type Props = {
  children: ReactNode;
  href: string;
} & DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

const Link = ({ children, href, ...props }: Props) => {
  return (
    <NextLink href={href}>
      <a {...props} className={styles.link}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
