import styles from "@styles/Components/Ui/Dropdown.module.scss";
import { useState } from "react";
import { ChevronDownOutline } from "react-ionicons";

interface Props {
  label: string;
  onChange: Function;
  value?: string;
  options: {
    label: string;
    value: string;
  }[];
}

const Dropdown = ({ value, label, options, onChange }: Props) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={styles.main}>
      <button className={styles.label} onClick={() => setOpen(!isOpen)}>
        <p>{value ? value : label}</p>
        <ChevronDownOutline
          cssClasses={`${styles.labelIcon} ${
            isOpen ? styles.labelIcon_open : styles.labelIcon_closed
          }`}
          color={"#00000"}
          height="25px"
          width="25px"
        />
      </button>
      <div
        className={`${styles.options} ${
          isOpen ? styles.options_open : styles.options_closed
        }`}
      >
        {options.map((option, optionIdx) => (
          <button
            onClick={() => {
              setOpen(false);
              onChange(option.value);
            }}
            key={optionIdx}
            className={styles.options_option}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
