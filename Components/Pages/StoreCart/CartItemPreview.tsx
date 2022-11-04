import styles from "@styles/Components/StoreCart/CartItemPreview.module.scss";
import {
  modifyProductQuantity,
  removeProduct,
} from "@rootDir/redux/cart/cartSlice";
import { useDispatch } from "react-redux";
import { ButtonFill } from "@components/Ui/Button";
import { CartItem } from "@rootDir/types";

interface Props {
  cartItem: CartItem | null;
  itemIdx: number | null;
  hideQuantityHandler?: boolean;
}

const CartItemPreview = ({ cartItem, itemIdx, hideQuantityHandler }: Props) => {
  const dispatch = useDispatch();

  if (!cartItem) {
    return <p>Either an error happened or there is no item to show here!</p>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.main_left}>
        <img
          className={styles.mainImage}
          src={cartItem.product.images[0]}
          alt=""
        />

        <div className={styles.mainInfo}>
          <p className={styles.mainInfo_name}>
            {cartItem.product.productName} - {cartItem.size}
          </p>
          <p className={styles.mainInfo_price}>${cartItem.product.price}</p>
        </div>
      </div>
      {!hideQuantityHandler ? (
        <div className={styles.main_right}>
          {cartItem.quantity <= 1 ? (
            <ButtonFill
              data-remove-btn
              onClick={() =>
                dispatch(
                  removeProduct({
                    product: cartItem.product,
                    size: cartItem.size,
                  })
                )
              }
            >
              X
            </ButtonFill>
          ) : (
            <ButtonFill
              onClick={() =>
                dispatch(
                  modifyProductQuantity({ itemIdx, type: "subtraction" })
                )
              }
            >
              -
            </ButtonFill>
          )}
          <p>{cartItem.quantity}</p>
          <ButtonFill
            onClick={() =>
              dispatch(modifyProductQuantity({ itemIdx, type: "addition" }))
            }
          >
            +
          </ButtonFill>
        </div>
      ) : null}
    </div>
  );
};

export default CartItemPreview;
