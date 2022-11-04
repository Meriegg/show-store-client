import styles from "@styles/Pages/Home.module.scss";
import Link from "next/link";
import { ButtonFill, ButtonOutline } from "@components/Ui/Button";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.hero_left}>
        <h1>Just Perfect</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <div className={styles.hero_left_buttonContainer}>
          <Link href="/store">
            <ButtonFill>Shop Now</ButtonFill>
          </Link>
          <Link href={"/contact"}>
            <ButtonOutline>Contact Us</ButtonOutline>
          </Link>
        </div>
      </div>

      {/* <div className={styles.hero_wordsContainer}>
          {Array.from(new Array(4)).map((row) => (
            <div ref={rowRef} className={styles.hero_wordsContainer_row}>
              {Array.from(new Array(20)).map((item) => (
                <p>BEST PRICE</p>
              ))}
            </div>
          ))}
        </div> */}

      {/* clip path for hero image */}
      <svg
        width="1343"
        height="987"
        viewBox="0 0 1343 987"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", zIndex: "-20" }}
      >
        <clipPath id="imageClip">
          <rect
            width="300"
            height="1248.88"
            transform="matrix(0.996195 -0.0871557 -0.633214 0.773977 790.805 20.1467)"
            fill="black"
          />
          <rect
            width="300"
            height="1248.88"
            transform="matrix(0.996195 -0.0871557 -0.633214 0.773977 1130.47 20.1467)"
            fill="black"
          />
          <rect
            width="300"
            height="1248.88"
            transform="matrix(0.996195 -0.0871557 -0.633214 0.773977 1470.13 20.1467)"
            fill="black"
          />
        </clipPath>
      </svg>
      {/* clip path for hero image */}

      <div className={styles.hero_right}></div>
    </div>
  );
};

export default Hero;
