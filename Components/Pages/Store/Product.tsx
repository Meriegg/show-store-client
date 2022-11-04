import styles from "@styles/Components/Store/Product.module.scss";
import Link from "@components/Ui/Link";
import Modal, { showModal, closeModal } from "@components/Ui/Modal";
import Dropdown from "@components/Ui/Dropdown";
import ProductTypes from "./ProductTypes";
import { addProduct } from "@rootDir/redux/cart/cartSlice";
import { useDispatch } from "react-redux";
import { Cart } from "react-ionicons";
import { ButtonFill } from "@components/Ui/Button";
import { StoreProduct } from "@rootDir/types";
import { useState } from "react";

interface Props {
  product: StoreProduct;
  isCartBtnDisabled?: boolean;
}

const Product = ({ product, isCartBtnDisabled }: Props) => {
  const [modalDropdownVal, setModalDropdownVal] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        isShowing={showAddModal}
        isShowingHandler={setShowAddModal}
        title={"Add Product"}
      >
        <Dropdown
          label={"Select a size!"}
          onChange={setModalDropdownVal}
          value={modalDropdownVal}
          options={[
            { label: "Option 1", value: "Option1" },
            { label: "Option 2", value: "Option2" },
          ]}
        />
        <ButtonFill
          style={{ marginTop: "10px", width: "100%" }}
          disabled={modalDropdownVal.split("").length <= 0}
          onClick={() => {
            closeModal(setShowAddModal, dispatch);
            dispatch(
              addProduct({ product, quantity: 1, size: modalDropdownVal })
            );
          }}
        >
          Add To Cart
        </ButtonFill>
      </Modal>
      <div className={styles.product}>
        <Link href={`/product/${product._id}`}>
          <div
            className={styles.product_image}
            style={{
              backgroundImage: `url(${product.images[0]})`,
              backgroundPosition: product.imageAlignment || "center",
            }}
          />
        </Link>

        <div className={styles.product_info}>
          <div className={styles.product_info_top}>
            <p className={styles.product_name}>{product.productName}</p>
            <p className={styles.product_price}>${product.price}</p>
          </div>
          <div className={styles.product_info_bottom}>
            <ProductTypes typesId={product.typesID} />
            <ButtonFill
              onClick={() => showModal(setShowAddModal, dispatch)}
              style={{ height: "min-content" }}
              disabled={isCartBtnDisabled}
            >
              <Cart
                title={"Cart Icon"}
                height={"20px"}
                width={"20px"}
                color={"#fff"}
              />
            </ButtonFill>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
