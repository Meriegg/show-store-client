import styles from "@styles/Pages/Checkout.module.scss";
import Input from "@components/Ui/Input";
import Loading from "@components/Ui/Loading";
import Error from "@components/Ui/Error";
import Modal, { closeModal } from "@components/Ui/Modal";
import { CREATE_ORDER } from "@rootDir/gql/mutations/order";
import { useMutation } from "@apollo/client";
import { ButtonFill, ButtonOutline } from "@components/Ui/Button";
import { useFormik } from "formik";
import { RootState } from "@rootDir/types";
import { useSelector, useDispatch } from "react-redux";
import { refetchOrders } from "@rootDir/redux/orderRefetch/orderRefetchSlice";
import { resetCartState } from "@rootDir/redux/cart/cartSlice";
import { useState, useEffect } from "react";
// @ts-expect-error
import { CopyToClipboard } from "react-copy-to-clipboard";
import type { NextPage } from "next";
import * as yup from "yup";

const Checkout: NextPage = () => {
  const [createOrder, { loading, error, data }] = useMutation(CREATE_ORDER);
  const [didSubmit, setDidSubmit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const cartState = useSelector((root: RootState) => root.cartSlice.value);

  useEffect(() => {
    if (!data?.createOrder) return;

    setShowModal(true);
    localStorage.setItem("LATEST_ORDER_ID", data.createOrder._id);
  }, [data]);

  const initialValues = {
    firstName: "",
    lastName: "",
    country: "",
    email: "",
    phoneNum: "",
    state: "",
    homeAddress: "",
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    country: yup.string().required(),
    email: yup.string().email().required(),
    phoneNum: yup.string().required(),
    state: yup.string().required(),
    homeAddress: yup.string().required(),
  });

  const { handleSubmit, values, errors, handleChange, resetForm } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: didSubmit,
    onSubmit: (submitValues) => {
      const finalValues = {
        ...submitValues,
        cartTotal: cartState.cartTotal,
        stringifiedOrder: `${JSON.stringify(cartState.products)}`,
      };

      createOrder({
        variables: {
          args: finalValues,
        },
      });
      resetForm();
      dispatch(resetCartState());
      dispatch(refetchOrders());
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className={styles.main}>
      <Modal
        isShowing={showModal}
        isShowingHandler={setShowModal}
        title={"Order placed successfully!"}
      >
        <div className={styles.modalContent}>
          <p>
            Your order was placed successfully! Since this is a demo, we did not
            actually store your sensitive information, but you can still view
            your order by clicking the gear icon in the bottom left of the
            screen and going to the admin page. Your order will be deleted
            within 48 hours.
          </p>
          <p className={styles.modalContent_orderID}>
            COPY YOUR ORDER_ID: {data?.createOrder._id}
          </p>
          <div>
            <ButtonFill onClick={() => closeModal(setShowModal, dispatch)}>
              Close This
            </ButtonFill>
            <CopyToClipboard
              text={data?.createOrder._id}
              onCopy={() => {
                closeModal(setShowModal, dispatch);
              }}
            >
              <ButtonFill data-copy-order-id>
                Copy Order ID and close
              </ButtonFill>
            </CopyToClipboard>
          </div>
        </div>
      </Modal>
      <div className={styles.header}>
        <h1>Checkout</h1>
        <p>
          This site is a prototype, your order will be saved and deleted within
          24 hours {";)"}. Your personal data would not be stored.
        </p>
      </div>
      {!cartState.products.length ? (
        <p style={{ textAlign: "center" }}>You have no products yet!</p>
      ) : (
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            setDidSubmit(true);
            handleSubmit(e);
          }}
        >
          <div className={styles.form_top}>
            <Input
              onChange={handleChange("firstName")}
              placeholder={"First Name"}
              value={values.firstName}
              error={errors.firstName}
            />
            <Input
              onChange={handleChange("lastName")}
              placeholder={"Last Name"}
              value={values.lastName}
              error={errors.lastName}
            />
          </div>
          <Input
            onChange={handleChange("country")}
            placeholder={"Country"}
            value={values.country}
            error={errors.country}
          />
          <Input
            onChange={handleChange("email")}
            placeholder={"Your Email"}
            value={values.email}
            error={errors.email}
          />
          <Input
            onChange={handleChange("phoneNum")}
            placeholder={"Your phone number"}
            value={values.phoneNum}
            error={errors.phoneNum}
          />
          <Input
            onChange={handleChange("state")}
            placeholder={"State / The equivalent in your country"}
            value={values.state}
            error={errors.state}
          />
          <Input
            onChange={handleChange("homeAddress")}
            placeholder={"Home Address"}
            value={values.homeAddress}
            error={errors.homeAddress}
          />
          <div className={styles.form_bottom}>
            <ButtonFill type="submit">Submit</ButtonFill>
            <ButtonOutline type="button" onClick={() => resetForm()}>
              Clear form
            </ButtonOutline>
          </div>
        </form>
      )}
    </div>
  );
};

export default Checkout;
