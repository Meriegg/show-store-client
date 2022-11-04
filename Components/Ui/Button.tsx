import styles from "@styles/Components/Ui/Button.module.scss";
import { ReactNode, DetailedHTMLProps, ButtonHTMLAttributes } from "react";

type Props = {
  children: ReactNode;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const ButtonFill = ({ children, ...props }: Props) => {
  return (
    <button className={styles.buttonFill} {...props}>
      {children}
    </button>
  );
};

export const ButtonOutline = ({ children, ...props }: Props) => {
  return (
    <button className={styles.buttonOutline} {...props}>
      {children}
    </button>
  );
};
