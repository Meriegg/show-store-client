import styles from "@styles/Pages/Home.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@rootDir/types";
import { useState, useEffect, useRef } from "react";

const Explore = () => {
  const itemNumber = 10;

  const [translateValue, setTranslateValue] = useState(0);
  const isMobile = useSelector(
    (state: RootState) => state.deviceType.value.isMobile
  );

  const itemContainerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const capTranslateVal = (val: number, min: number, max: number) => {
    return Math.min(Math.max(val, min), max);
  };

  const setSafeTranslateValue = (value: number) => {
    if (!itemContainerRef.current || !itemRef.current) return;

    const itemsContainerRect = itemContainerRef.current.getBoundingClientRect();
    const currentItemRect = itemRef.current.getBoundingClientRect();

    const cappedTranslateValue = capTranslateVal(
      value,
      0,
      itemsContainerRect.width - window.innerWidth + currentItemRect.width / 2
    );

    setTranslateValue(cappedTranslateValue);
  };

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      const clientX = e.screenX;

      setSafeTranslateValue(clientX);
    });
  }, []);

  return (
    <div className={styles.explore}>
      <h1>
        You explore. <br /> We Deliver.
      </h1>

      {isMobile ? (
        <div className={styles.explore_mobileCategories}>
          {Array.from(new Array(itemNumber)).map((_, itemIdx) => (
            <div key={itemIdx}>Item</div>
          ))}
        </div>
      ) : (
        <div
          ref={itemContainerRef}
          className={styles.explore_categories}
          style={{ transform: `translateX(-${translateValue}px)` }}
        >
          {Array.from(new Array(itemNumber)).map((_, itemIdx) => (
            <div ref={itemRef} key={itemIdx}>
              Item
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;
