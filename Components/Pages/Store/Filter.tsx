import styles from "@styles/Components/Store/Filter.module.scss";
import Loading from "@components/Ui/Loading";
import Error from "@components/Ui/Error";
import { MEDIA_QUERIES } from "@rootDir/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@rootDir/types";
import { GET_TYPES } from "@rootDir/gql/query/products";
import { setTypes } from "@rootDir/redux/storeTypes/storeTypesSlice";
import { useQuery } from "@apollo/client";
import { ChevronDownOutline } from "react-ionicons";
import { ChangeEvent } from "react";
import { MAX_PRODUCT_PRICE } from "@rootDir/constants";
import { ProductType, StoreFilters } from "@rootDir/types";
import { useState, useEffect } from "react";

interface Props {
  storeFilters: StoreFilters;
  setStoreFilters: Function;
}

const Filter = ({ storeFilters, setStoreFilters }: Props) => {
  const { data, loading, error } = useQuery(GET_TYPES);
  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
  const globalState = useSelector((root: RootState) => root);
  const dispatch = useDispatch();

  // The `useMediaQuery` hook is unusable without `useEffect`
  // because the component is first rendered on the server which does not contain
  // the `window` or `document` objects. So to be sure that the hook always
  // runs on the client, we use `useEffect`.
  const [isMobile, setMobile] = useState(false);

  const localState = globalState.localValues.value;
  useEffect(() => {
    if (localState.localTypes.length) {
      dispatch(setTypes({ types: localState.localTypes }));
      return;
    }
    if (!data) return;

    dispatch(setTypes({ types: data.getAllTypes }));
  }, [data]);

  useEffect(() => {
    const didHitMobile = window.innerWidth <= MEDIA_QUERIES["tablet"];

    setMobile(didHitMobile);
  }, []);

  if (loading && !localState.localTypes.length) {
    return <Loading />;
  }

  if (error && !localState.localTypes.length) {
    return <Error error={error} />;
  }

  const checkIfTypeActive = (type: ProductType) => {
    const idxOfType = storeFilters.type?.findIndex(
      (activeType) => activeType._id === type._id
    );

    if (idxOfType === -1 || idxOfType === undefined) {
      return {
        isActive: false,
        id: null,
      };
    }

    return {
      isActive: true,
      id: type._id,
    };
  };

  const addProductType = (type: ProductType) => {
    let tempFilters = { ...storeFilters };

    tempFilters["type"]?.push(type);

    setStoreFilters(tempFilters);
  };

  const removeProductType = (type: ProductType) => {
    const typeStatus = checkIfTypeActive(type);
    if (!typeStatus.isActive) return;

    let tempFilters = { ...storeFilters };

    tempFilters["type"] = tempFilters["type"].filter(
      (productType) => productType._id !== typeStatus.id
    );

    setStoreFilters(tempFilters);
  };

  const handlePriceFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    let tempFilters = { ...storeFilters };

    tempFilters["price"] = parseFloat(e.target.value);

    setStoreFilters(tempFilters);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContainer_header}>
        <p>Filter</p>
        <button
          onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
          className={`${styles.openFilterBtn} ${
            isMobileFilterOpen
              ? styles.openFilterBtn_open
              : styles.openFilterBtn_closed
          }`}
        >
          <ChevronDownOutline color={"#00000"} height="25px" width="25px" />
        </button>
      </div>

      <div
        className={`${styles.filter} ${
          isMobile
            ? `${
                isMobileFilterOpen ? styles.filter_open : styles.filter_closed
              }`
            : ""
        }`}
      >
        <div className={styles.filter_price}>
          <p className={styles.filter_price_label}>price</p>
          <input
            type="range"
            min={0}
            max={MAX_PRODUCT_PRICE}
            value={storeFilters.price}
            className="myslider"
            id="sliderRange"
            onChange={(e) => handlePriceFilterChange(e)}
          />
          <div className={styles.filter_price_value}>
            <p>$0</p>
            <p>-</p>
            <p>${storeFilters.price === 0 ? "MIN" : storeFilters.price}</p>
          </div>
        </div>

        <div className={styles.filter_types}>
          <p>type</p>
          {globalState.storeTypes.value.types.map(
            (productType: ProductType, idx: number) => {
              const productTypeStatus = checkIfTypeActive(productType);

              return (
                <div
                  className={`${styles.filter_types_type} ${
                    productTypeStatus.isActive
                      ? styles.filter_types_typeActive
                      : ""
                  }`}
                  key={idx}
                >
                  <p>{productType.typeName}:</p>

                  <button
                    onClick={() => {
                      productTypeStatus.isActive
                        ? removeProductType(productType)
                        : addProductType(productType);
                    }}
                    className={`${styles.filter_types_addTypeBtn} ${
                      productTypeStatus.isActive
                        ? styles.filter_types_addTypeBtnAdded
                        : ""
                    }`}
                  >
                    <div></div>
                  </button>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
