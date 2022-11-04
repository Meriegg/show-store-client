import styles from "@styles/Components/GlobalCartNotify.module.scss";
import CartItemPreview from "./Pages/StoreCart/CartItemPreview";
import { ButtonFill } from "./Ui/Button";
import { closeAddedPreview } from "@rootDir/redux/cart/cartSlice";
import { RootState } from "@rootDir/types";
import { useSelector, useDispatch } from "react-redux";

const GlobalCartNotify = () => {
  const cartState = useSelector((state: RootState) => state.cartSlice.value);
  const { recentAddedProductIdx, products, showAddedPreview } = cartState;
  const isAddedIdxValid = recentAddedProductIdx !== null;
  const dispatch = useDispatch();

  if (!showAddedPreview) {
    return null;
  }

  return (
    <div className={styles.main}>
      <p
        className={styles.main_header}
        style={{ margin: "5px", fontSize: "1.125rem" }}
      >
        Added Item!
      </p>
      <CartItemPreview
        itemIdx={isAddedIdxValid ? recentAddedProductIdx : null}
        cartItem={isAddedIdxValid ? products[recentAddedProductIdx] : null}
      />
      <ButtonFill
        style={{ marginTop: "20px" }}
        onClick={() => dispatch(closeAddedPreview())}
      >
        close
      </ButtonFill>
    </div>
  );
};

export default GlobalCartNotify;
