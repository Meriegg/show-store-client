import Modal from "@components/Ui/Modal";
import styles from "@styles/Admin/Order.module.scss";
import { ButtonFill } from "@components/Ui/Button";
import { AdminOrder, CartItem } from "@rootDir/types";
import { useState } from "react";

interface Props {
  order: AdminOrder;
}

const Order = ({ order }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.order}>
      <Modal
        isShowing={isModalOpen}
        isShowingHandler={setModalOpen}
        title="Order Contents"
      >
        <div className={styles.orderContents}>
          <p>Order id: {order._id}</p>
          {JSON.parse(order.stringifiedOrder).map(
            (item: CartItem, itemIdx: number) => (
              <div
                key={itemIdx}
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={item.product.images[0]}
                  alt=""
                  style={{ maxWidth: "60px", height: "auto" }}
                />
                <div>
                  <p>
                    {item.product.productName} - {item.size}
                  </p>
                  <p>${item.product.price}</p>
                  <p>quantity: {item.quantity}</p>
                </div>
              </div>
            )
          )}
        </div>
      </Modal>
      <p>
        Name: {order.firstName} {order.lastName}
      </p>
      <p>Country: {order.country}</p>
      <p>Email: {order.email}</p>
      <p>Home Address: {order.homeAddress}</p>
      <p>Phone number: {order.phoneNum}</p>
      <p>State: {order.state}</p>
      <p>Country: {order.country}</p>
      <p>Total: ${order.cartTotal || "NO TOTAL"}</p>
      <p className={styles.order_id}>Order Id: {order._id}</p>
      <ButtonFill onClick={() => setModalOpen(true)} data-view-order-btn>
        View Order
      </ButtonFill>
    </div>
  );
};

export default Order;
