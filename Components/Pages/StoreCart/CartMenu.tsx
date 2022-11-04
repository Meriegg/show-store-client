import styles from "@styles/Components/StoreCart/CartMenu.module.scss";
import CartItemPreview from "./CartItemPreview";
import Link from "next/link";
import { CloseOutline } from "react-ionicons";
import { useState, useEffect } from "react";
import { ButtonFill } from "@components/Ui/Button";
import { RootState } from "@rootDir/types";
import { useDispatch, useSelector } from "react-redux";
import { setCartMenuState, setCartTotal } from "@rootDir/redux/cart/cartSlice";

const CartMenu = () => {
  const [total, setTotal] = useState(0);
  const [hasNoProducts, setNoProducts] = useState(false);
  const cartState = useSelector((root: RootState) => root.cartSlice.value);
  const localState = useSelector((root: RootState) => root.localValues.value);
  const dispatch = useDispatch();

  useEffect(() => {
    setNoProducts(cartState.products.length <= 0);
  }, [cartState.products]);

  useEffect(() => {
    let tempTotal = 0;
    for (const item of cartState.products) {
      tempTotal += item.product.price * item.quantity;
    }

    const finalTotal = Math.round(tempTotal);
    setTotal(() => finalTotal);
    dispatch(setCartTotal({ val: finalTotal }));
  }, [cartState.products]);

  return (
    <div
      className={`${styles.mainOverlay} ${
        cartState.isCartMenuOpen
          ? styles.mainOverlay_open
          : styles.mainOverlay_closed
      }`}
    >
      <div
        className={`${styles.mainCart} ${
          cartState.isCartMenuOpen
            ? styles.mainCart_open
            : styles.mainCart_closed
        }`}
      >
        <div className={styles.mainCart_top}>
          <div className={styles.header}>
            <p>Your cart</p>
            <button onClick={() => dispatch(setCartMenuState({ val: false }))}>
              <CloseOutline color={"#00000"} height="25px" width="25px" />
            </button>
          </div>
          <div className={styles.productsContainer}>
            {!hasNoProducts ? (
              <>
                {cartState.products.map((product, productIdx) => (
                  <CartItemPreview
                    cartItem={product}
                    itemIdx={productIdx}
                    key={productIdx}
                  />
                ))}
              </>
            ) : (
              <p className={styles.noProductsWarning}>
                {"You don't have any products yet!"}
              </p>
            )}
          </div>
        </div>
        <div>
          {!hasNoProducts ? (
            <div className={styles.totalPrice}>
              <div className={styles.totalPrice_top}>
                <p className={styles.totalPrice_price}>subtotal: ${total}</p>
                <p className={styles.totalPrice_total}>
                  total: ${Math.round(total + 15)}
                </p>
              </div>
              <p className={styles.totalPrice_price}>+ shipping $15</p>
            </div>
          ) : null}
          <Link href={"/checkout"}>
            <ButtonFill
              onClick={() => dispatch(setCartMenuState({ val: false }))}
              disabled={!!localState.localProducts.length || hasNoProducts}
              style={{
                width: "100%",
                fontSize: "1.125rem",
              }}
            >
              Go to checkout
            </ButtonFill>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartMenu;
