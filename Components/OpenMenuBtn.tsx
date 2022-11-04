import styles from "@styles/Components/OpenMenuBtn.module.scss";

interface Props {
  setActive: Function;
  isActive: boolean;
}

const OpenMenuBtn = ({ setActive, isActive }: Props) => {
  return (
    <button
      className={!isActive ? styles.openMenuBtn : styles.openMenuBtnOpen}
      onClick={() => setActive(!isActive)}
    >
      <div
        className={
          !isActive ? styles.openMenuBtn_line : styles.openMenuBtnOpen_line
        }
      ></div>
    </button>
  );
};

export default OpenMenuBtn;
