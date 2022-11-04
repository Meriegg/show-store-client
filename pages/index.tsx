import styles from "@styles/Pages/Home.module.scss";
import Hero from "@components/Pages/Home/Hero";
import OurBrand from "@components/Pages/Home/OurBrand";
import Explore from "@components/Pages/Home/Explore";
import Newsletter from "@components/Pages/Home/Newsletter";
import Footer from "@components/Footer";
import type { NextPage } from "next";

const Home: NextPage = () => {
  // const rowRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (!rowRef.current) return;

  //   rowRef.current.classList.add("animateHeroWordRow");
  //   rowRef.current.addEventListener("animationend", () => {
  //     console.log("end");
  //   });
  // }, []);

  return (
    <div className={styles.mainContainer}>
      <Hero />
      <OurBrand />
      <Explore />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
