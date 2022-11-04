import styles from "@styles/Components/Ui/Logo.module.scss";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <p className={styles.logo_top}>SHOW</p>
      <div className={styles.logo_divider}></div>
      <p className={styles.logo_bottom}>STORE</p>
    </div>
  );
};

export default Logo;
