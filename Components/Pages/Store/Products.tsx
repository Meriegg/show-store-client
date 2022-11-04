import BreadCrumbs from "@components/Ui/BreadCrumbs";
import styles from "@styles/Components/Store/Products.module.scss";
import Loading from "@components/Ui/Loading";
import Error from "@components/Ui/Error";
import Product from "./Product";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "@gql/query/products";
import { useSelector } from "react-redux";
import { RootState, StoreProduct } from "@rootDir/types";
import { ButtonFill } from "@components/Ui/Button";
import { StoreFilters } from "@rootDir/types";
import { useState, useEffect } from "react";

interface Props {
  storeFilters: StoreFilters;
  setStoreFilters: Function;
}

const Products = ({ storeFilters, setStoreFilters }: Props) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [finalProducts, setFinalProducts] = useState<StoreProduct[]>([]);
  const isFilterActive = useSelector(
    (root: RootState) => root.storeFilter.value.isActive
  );
  const localProducts = useSelector(
    (root: RootState) => root.localValues.value.localProducts
  );

  useEffect(() => {
    const mainProducts = localProducts.length
      ? localProducts
      : data?.getProducts;
    if (!mainProducts) return;
    if (!isFilterActive) {
      setFinalProducts(mainProducts);
      return;
    }

    /* 
    this variable is used to store all the filtered products and set the final products when
    filtering is done 
    */
    let tempFilteredProducts: StoreProduct[] = [];

    /* 
    Filter by price

    Goes through every product received via API, and checks if the price is lower or equal to the 
    filter price, and if it does not already exists in the `tempFilteredProducts` array. If both
    conditions are met, the product will be pushed inside the `tempFilteredProducts` array.
    */

    for (const product of mainProducts) {
      const matchingPrice = product.price >= storeFilters.price;
      const alreadyExists =
        tempFilteredProducts.findIndex(
          (existingProduct) => existingProduct._id === product._id
        ) === -1;

      if (!matchingPrice && alreadyExists) {
        tempFilteredProducts.push(product);
      }
    }

    /* 
    Filter by types
     
    This uses either the products received from the API or the products already filtered by price
    because if the user already filters the products by price, we do not want to show the products
    that match the types but are over the price limit.

    If the user did not filter the products by type, the `tempFilteredProducts` array will be empty,
    so we are forced to use the data received via API.

    This works similar to the price filter, it loops over the existing products,
    either `tempFilteredProducts` or `data.getProducts` (data received via API), 
    but we cannot push the products directly into the `tempFilteredProducts` array because
    every product that matches and does not match the types is already into that array, so the
    second condition (if it does not already exist) will be evaluated to `false`. 

    We can create another empty array and push the products that match the conditions into that array
    and then set the value of `tempFilteredProducts` to the array we just created. 
    (Read above to understand why this works)
    */
    const storeFilterTypes = storeFilters.type;
    const productsToBeFiltered =
      tempFilteredProducts.length > 0 ? tempFilteredProducts : data.getProducts;
    if (storeFilterTypes.length > 0) {
      let tempTypeFilter: StoreProduct[] = [];

      for (const type of storeFilterTypes) {
        for (const product of productsToBeFiltered) {
          const hasMatchingType =
            product.typesID.findIndex(
              (productTypeId: string) => productTypeId === type._id
            ) !== -1;
          const alreadyExists =
            tempTypeFilter.findIndex(
              (existingProduct) => existingProduct._id === product._id
            ) !== -1;

          if (hasMatchingType && !alreadyExists) {
            tempTypeFilter.push(product);
          }
        }
      }

      tempFilteredProducts = tempTypeFilter;
    }

    setFinalProducts(() => tempFilteredProducts);
  }, [storeFilters, data, isFilterActive]);

  const clearStoreFilters = () => {
    setStoreFilters({
      price: 0,
      type: [],
    });
  };

  if (loading && !localProducts.length) {
    return <Loading />;
  }

  if (error && !localProducts.length) {
    return <Error error={error} />;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <div className={styles.header_left}>
          <BreadCrumbs
            elements={[
              { text: "Home", link: "/" },
              { text: "Store", link: "/store" },
            ]}
          />
          {storeFilters.type.length ? (
            <div className={styles.header_left_filterData}>
              {storeFilters.type.map((type, typeIdx) => (
                <p key={typeIdx}>@{type.typeName}</p>
              ))}
            </div>
          ) : null}
        </div>
        <div className={styles.header_right}>
          <ButtonFill
            onClick={() => clearStoreFilters()}
            disabled={!isFilterActive}
          >
            clear filters
          </ButtonFill>
        </div>
      </div>
      <div className={styles.products}>
        {finalProducts.length > 0 ? (
          <>
            {finalProducts.map((product: StoreProduct, productIdx: number) => (
              <Product
                key={productIdx}
                product={product}
                isCartBtnDisabled={!!localProducts.length}
              />
            ))}
          </>
        ) : (
          <div>We have no products that match those filters :(</div>
        )}
      </div>
    </div>
  );
};

export default Products;
