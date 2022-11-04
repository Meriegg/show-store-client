import styles from "@styles/Pages/Home.module.scss";

const OurBrand = () => {
  return (
    <div className={styles.ourBrand}>
      <div className={styles.ourBrand_content}>
        <h1>Our Brand</h1>

        <div className={styles.ourBrand_info}>
          <h2>
            How We Started{" "}
            <span className={styles.ourBrand_info_decorator}>?</span>
          </h2>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>

      <div className={styles.ourBrand_verticalLine}></div>

      <div
        className={styles.ourBrand_decorator}
        style={{ left: "-110px", bottom: "-140px" }}
      >
        <p>OUR</p>
        <p>BRAND</p>
      </div>

      <div
        className={styles.ourBrand_decorator}
        style={{ right: "-220px", top: "55px" }}
      >
        <p>OUR</p>
        <p>BRAND</p>
      </div>
    </div>
  );
};

export default OurBrand;
