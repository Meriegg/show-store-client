import styles from "@styles/Pages/Store.module.scss";
import Filter from "@components/Pages/Store/Filter";
import Products from "@components/Pages/Store/Products";
import { MAX_PRODUCT_PRICE } from "@rootDir/constants";
import { useDispatch } from "react-redux";
import { setActive } from "@rootDir/redux/storeFilter/storeFilterSlice";
import { INACTIVE_FILTERS } from "@rootDir/constants";
import { useState, useEffect } from "react";
import { StoreFilters } from "@rootDir/types";
import type { NextPage } from "next";

const Store: NextPage = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState<StoreFilters>({
    price: MAX_PRODUCT_PRICE,
    type: [],
  });

  useEffect(() => {
    let isActive = JSON.stringify(filters) !== JSON.stringify(INACTIVE_FILTERS);

    dispatch(setActive({ isActive }));
  }, [filters]);

  return (
    <div className={styles.mainLayout}>
      <div className={styles.mainLayout_left}>
        <Filter storeFilters={filters} setStoreFilters={setFilters} />
      </div>
      <div className={styles.mainLayout_right}>
        <Products storeFilters={filters} setStoreFilters={setFilters} />
      </div>
    </div>
  );
};

export default Store;
