import styles from "@styles/Components/Ui/Input.module.scss";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Props = {
  error: string | undefined;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = ({ error, ...props }: Props) => {
  return (
    <div className={styles.inputContainer}>
      <input className={styles.input} {...props} type="text" />
      {error ? <p className={styles.inputError}>{error}</p> : null}
    </div>
  );
};

export default Input;
