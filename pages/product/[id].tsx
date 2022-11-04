import Loading from "@components/Ui/Loading";
import Error from "@components/Ui/Error";
import styles from "@styles/Pages/Product.module.scss";
import Dropdown from "@components/Ui/Dropdown";
import BreadCrumbs from "@components/Ui/BreadCrumbs";
import ProductTypes from "@components/Pages/Store/ProductTypes";
import { PRODUCT_SIZES } from "@rootDir/constants";
import { useSelector } from "react-redux";
import { RootState } from "@rootDir/types";
import { addProduct } from "@rootDir/redux/cart/cartSlice";
import { useDispatch } from "react-redux";
import { ButtonFill } from "@components/Ui/Button";
import { useState } from "react";
import { GET_PRODUCT } from "@rootDir/gql/query/products";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { StoreProduct } from "@rootDir/types";
import type { NextPage } from "next";

// @ts-expect-error
import { CopyToClipboard } from "react-copy-to-clipboard";

const Product: NextPage = () => {
  const [productImageIdx, setProductImgIdx] = useState(0);
  const [didCopy, setCopied] = useState(false);
  const [dropdownVal, setDropdownVal] = useState("");
  const [quantity, setQuantity] = useState(1);
  const localProducts = useSelector(
    (root: RootState) => root.localValues.value.localProducts
  );
  const productId = useRouter().query.id;
  const dispatch = useDispatch();
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      productId: productId,
    },
  });

  const increaseProductImgIdx = () => {
    setProductImgIdx((prevIdx) =>
      prevIdx >= product.images.length - 1 ? 0 : prevIdx + 1
    );
  };

  const decreaseProductImgIdx = () => {
    setProductImgIdx((prevIdx) =>
      prevIdx <= 0 ? product.images.length - 1 : prevIdx - 1
    );
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity <= 1 ? 1 : prevQuantity - 1));
  };

  if (loading && !localProducts.length) {
    return <Loading />;
  }

  if (error && !localProducts.length) {
    return <Error error={error} />;
  }

  // Since this variable is constant and will never change
  // I can make it a `const` and can use it outside `useState`. The variable's value depends on the
  // `data` object which can change only when the url changes, which will automatically cause a rerender
  // so `useState` and rerenders are not a problem.
  const product: StoreProduct = localProducts.length
    ? localProducts[
        localProducts.findIndex((product) => product._id === productId)
      ]
    : data.getProduct;

  if (!product) {
    return <p>Could not find item :(</p>;
  }

  return (
    <div className={styles.mainLayout}>
      <div className={styles.header}>
        <BreadCrumbs
          elements={[
            { link: "/store", text: "Store" },
            { link: `store/${product._id}`, text: product.productName },
          ]}
        />
        <CopyToClipboard
          text={`https://show-store.vercel.app/product/${product._id}`}
          onCopy={() => {
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2000);
          }}
        >
          <ButtonFill disabled={didCopy}>
            {didCopy ? "Copied!" : "Copy page link"}
          </ButtonFill>
        </CopyToClipboard>
      </div>
      <div className={styles.main}>
        <div className={styles.main_left}>
          <img src={product.images[productImageIdx]} alt="product picture" />
          {product.images.length > 1 ? (
            <div className={styles.imageSliderButtons}>
              <ButtonFill onClick={() => decreaseProductImgIdx()}>
                &lt;
              </ButtonFill>
              {product.images.map((_, imgIdx) => (
                <div
                  key={imgIdx}
                  className={`${styles.imageSliderDot} ${
                    imgIdx === productImageIdx
                      ? styles.imageSliderDotActive
                      : ""
                  }`}
                ></div>
              ))}
              <ButtonFill onClick={() => increaseProductImgIdx()}>
                &gt;
              </ButtonFill>
            </div>
          ) : null}
        </div>
        <div className={styles.main_right}>
          <p className={styles.price}>${product.price}</p>
          <p className={styles.name}>{product.productName}</p>
          <ProductTypes typesId={product.typesID} />
          <div className={styles.infoSelect}>
            <Dropdown
              label={"Select a size!"}
              onChange={setDropdownVal}
              value={dropdownVal}
              options={PRODUCT_SIZES.map((product) => ({
                label: product,
                value: product,
              }))}
            />

            <div className={styles.infoSelect_quantitySelect}>
              <ButtonFill onClick={() => decreaseQuantity()}>-</ButtonFill>
              <p>{quantity}</p>
              <ButtonFill onClick={() => increaseQuantity()}>+</ButtonFill>
            </div>
          </div>
          <div className={styles.divider}></div>
          <ButtonFill
            onClick={() =>
              dispatch(addProduct({ product, quantity, size: dropdownVal }))
            }
            disabled={!!localProducts.length || dropdownVal.length <= 0}
            style={{ width: "100%" }}
          >
            Add to cart
          </ButtonFill>
        </div>
      </div>
    </div>
  );
};

export default Product;
