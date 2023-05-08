"use client";

import Button from "@/components/Button";
import TextArea from "@/components/Textarea";
import { Country } from "country-state-city";
import { api } from "@/utils/api";
import { z } from "zod";
import { useFormik } from "formik";
import { useCart } from "@/lib/zustand/useCart";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { calcCartTotal } from "@/utils/calc-total";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { OrderDataSchema } from "@/lib/zod/schemas";
import Alert from "@/components/Alert";
import Checkbox from "@/components/Checkbox";
import Radio from "@/components/Radio";
import LoadingText from "@/components/LoadingText";
import Input from "@/components/Input";
import Dropdown from "@/components/Dropdown";
import StripeForm from "./StripeForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const CheckoutForm = () => {
  const [showAddressExtras, setShowAddressExtras] = useState(false);
  const [showDeliveryExtras, setShowDeliveryExtras] = useState(false);
  const { items } = useCart((state) => state);
  const {
    isLoading: isShippingPriceLoading,
    data: shippingPrice,
    error: shippingPriceError,
  } = api.storeConfig.getShippingPrice.useQuery();
  const [validateOnChange, setValidateOnChange] = useState(false);
  const [success, setSuccess] = useState(false);
  const placeOrder = api.order.createOrder.useMutation();

  const [showStripeForm, setShowStripeForm] = useState(false);
  const [createPaymentIntentError, setCreatePaymentIntentError] = useState<string | null>(null);

  const createStripePaymentIntent = api.stripe.createPaymentIntent.useMutation({
    onError: (error) => {
      setCreatePaymentIntentError(error.message);
    },
    onSuccess: () => {
      setShowStripeForm(true);
      setCreatePaymentIntentError(null);
    },
  });

  const { handleSubmit, handleChange, errors, values, setFieldValue } = useFormik<
    z.infer<typeof OrderDataSchema>
  >({
    validationSchema: toFormikValidationSchema(OrderDataSchema),
    validateOnChange,
    initialValues: {
      address: "",
      firstName: "",
      lastName: "",
      email: "",
      paymentMode: "pay_on_delivery",
      country: "",
      addressExtras: "",
      extraDeliveryNotes: "",
    },
    onSubmit: (data) => {
      if (!shippingPrice) {
        return;
      }

      if (data.paymentMode === "pay_online") {
        createStripePaymentIntent.mutate({
          items,
          shippingPrice,
        });
      } else {
        placeOrder.mutate(
          { items, orderData: data, shippingPrice, setAsPaid: false },
          {
            onSuccess: () => {
              setSuccess(true);
            },
          }
        );
        // Create order...
      }
    },
  });

  if (!items.length) {
    return null;
  }

  return (
    <div
      style={{
        width: "min(400px, 100%)",
      }}
      className="p-4 border-1 border-neutral-100 rounded-md font-semibold"
    >
      <h1 className="text-lg text-neutral-900">Place order!</h1>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          setValidateOnChange(true);
          handleSubmit(e);
        }}
      >
        <div className="flex items-center justify-between">
          <p className="text-neutral-600 text-sm">Subtotal:</p>
          <p>{calcCartTotal(items)}$</p>
        </div>
        {isShippingPriceLoading && <LoadingText customLabel="Loading shipping price" />}
        {!isShippingPriceLoading && !shippingPriceError && (
          <>
            <p className="text-right w-full text-red-600">Shipping +{shippingPrice}$</p>
            <hr />
            <div className="flex items-center justify-between">
              <p className="text-neutral-600 text-sm">Total:</p>
              <p>{parseFloat((calcCartTotal(items) + shippingPrice).toFixed(2))}$</p>
            </div>
          </>
        )}
        {!showStripeForm && !success && (
          <>
            <Input
              label="First name"
              withAsterisk
              placeholder="John"
              value={values.firstName}
              onChange={handleChange("firstName")}
              error={errors.firstName}
            />
            <Input
              label="Last Name"
              withAsterisk
              placeholder="Doe"
              value={values.lastName}
              onChange={handleChange("lastName")}
              error={errors.lastName}
            />
            <Input
              label="Your email"
              withAsterisk
              placeholder="johndoe@example.com"
              value={values.email}
              onChange={handleChange("email")}
              error={errors.email}
            />
            <Dropdown
              options={Country.getAllCountries().map((country) => ({
                key: `${country.name}`,
                value: country.name,
              }))}
              error={errors.country}
              value={values.country}
              setValue={(val) => setFieldValue("country", val)}
              shownValue={values.country}
              hasSearch
              isFullWidth
              placeholder="Select your country"
            />
            <Input
              label="Your Address"
              withAsterisk
              placeholder="City/State - Your address"
              value={values.address}
              onChange={handleChange("address")}
              error={errors.address}
            />
            <p className="font-semibold text-black text-sm mt-2">How would you wish to pay?</p>
            <Radio
              value={"pay_on_delivery" as typeof values.paymentMode}
              errorMessage={errors.paymentMode}
              onChange={handleChange("paymentMode")}
              label="Pay on delivery"
              checked={values.paymentMode === "pay_on_delivery"}
            />
            <Radio
              value={"pay_online" as typeof values.paymentMode}
              errorMessage={errors.paymentMode}
              onChange={handleChange("paymentMode")}
              label="Pay online"
              checked={values.paymentMode === "pay_online"}
            />
            <Checkbox
              checked={showAddressExtras}
              setChecked={setShowAddressExtras}
              label="Do you have something useful you can add to your address?"
            />
            {showAddressExtras && (
              <TextArea
                value={values.addressExtras}
                onChange={handleChange("addressExtras")}
                placeholder="Add some extras to your address..."
              />
            )}
            <Checkbox
              checked={showDeliveryExtras}
              setChecked={setShowDeliveryExtras}
              label="Do you have any specific requirements for the courier?"
            />
            {showDeliveryExtras && (
              <TextArea
                value={values.extraDeliveryNotes}
                onChange={handleChange("extraDeliveryNotes")}
                placeholder="Something the courier should know..."
              />
            )}
          </>
        )}
        {createPaymentIntentError && values.paymentMode === "pay_online" && (
          <Alert labelClassName="text-sm" color="danger" label={createPaymentIntentError} />
        )}
        {success && (
          <div className="w-full flex flex-col text-base items-center gap-2 mt-4 text-green-500">
            <FontAwesomeIcon icon={faCheck} />
            <p className="font-semibold text-green-500">Order placed successfully!</p>
          </div>
        )}
        {!success && (
          <>
            {values.paymentMode === "pay_online" ? (
              <>
                {!showStripeForm && (
                  <Button
                    className="w-full"
                    right={<FontAwesomeIcon icon={faCreditCard} />}
                    type="submit"
                    loading={createStripePaymentIntent.isLoading}
                    disabled={
                      !!shippingPriceError || !!createStripePaymentIntent.data || showStripeForm
                    }
                  >
                    {createPaymentIntentError ? "Try again!" : "Continue to payment!"}
                  </Button>
                )}

                {showStripeForm && !!createStripePaymentIntent.data && (
                  <Elements
                    options={{
                      appearance: {
                        theme: "stripe",
                      },
                      clientSecret: createStripePaymentIntent.data,
                    }}
                    stripe={stripePromise}
                  >
                    <StripeForm
                      orderInformation={values}
                      shippingPrice={shippingPrice as number}
                      clientSecret={createStripePaymentIntent.data}
                    />
                  </Elements>
                )}
              </>
            ) : (
              <Button
                className="w-full"
                right={<FontAwesomeIcon icon={faCheck} />}
                type="submit"
                disabled={!!shippingPriceError}
                loading={placeOrder.isLoading}
              >
                Place order!
              </Button>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
