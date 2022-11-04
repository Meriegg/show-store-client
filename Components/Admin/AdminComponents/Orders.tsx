import styles from "@styles/Admin/Orders.module.scss";
import Loading from "@components/Ui/Loading";
import Error from "@components/Ui/Error";
import Order from "./Order";
import Input from "@components/Ui/Input";
import { useSelector } from "react-redux";
import { RootState } from "@rootDir/types";
import { ButtonFill, ButtonOutline } from "@components/Ui/Button";
import { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_ORDERS } from "@rootDir/gql/query/orders";
import { AdminOrder } from "@rootDir/types";

const Orders = () => {
  const [isLoadingNewOrders, setLoadingNewOrders] = useState(false);
  const [refetchOrdersQuery] = useLazyQuery(GET_ORDERS);
  const [didFilter, setDidFilter] = useState(false);
  const [finalOrders, setFinalOrders] = useState<AdminOrder[]>([]);
  const [orderError, setError] = useState("");
  const [orderId, setOrderId] = useState("");
  const orderRefetch = useSelector(
    (root: RootState) => root.orderRefetchSlice.value.refetchCount
  );
  const { loading, error, data } = useQuery(GET_ORDERS);

  const filterOrders = () => {
    if (!orderId) return;

    setDidFilter(true);

    const finalOrders = data?.getAllOrders.filter(
      (order: AdminOrder) => order._id === orderId
    );

    if (finalOrders?.length && orderId && finalOrders.length) {
      setFinalOrders((_) => finalOrders);
      setError("");
      return;
    }

    setFinalOrders([]);
    setError("Could not find any orders with that ID!");
  };

  const clearFilters = () => {
    setDidFilter(false);
    setOrderId("");
  };

  useEffect(() => {
    if (!data?.getAllOrders) return;

    if (!didFilter) {
      setFinalOrders(data?.getAllOrders);
      setError("");
    }
  }, [didFilter, data]);

  useEffect(() => {
    (async () => {
      setLoadingNewOrders(true);
      const { data } = await refetchOrdersQuery();

      setFinalOrders(data?.getAllOrders);
      setLoadingNewOrders(false);
    })();
  }, [orderRefetch]);

  if (error) {
    return <Error error={error} />;
  }

  if (loading || isLoadingNewOrders || !finalOrders?.length) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Orders</h1>
      <div className={styles.inputGroup}>
        <Input
          placeholder="Type in your order id!"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          error={""}
        />
        <ButtonFill disabled={!orderId} onClick={() => filterOrders()}>
          Search!
        </ButtonFill>
        <ButtonOutline onClick={() => clearFilters()}>
          Clear filters
        </ButtonOutline>
      </div>
      <ButtonFill
        style={{ marginTop: "10px" }}
        onClick={() => {
          setOrderId(localStorage.getItem("LATEST_ORDER_ID") as string);
        }}
        disabled={!localStorage.getItem("LATEST_ORDER_ID")}
      >
        Use locally stored ID
      </ButtonFill>

      {orderError && <p>{orderError}</p>}
      <div className={styles.orders}>
        {finalOrders.map((order: AdminOrder, orderIdx) => (
          <Order key={orderIdx} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
