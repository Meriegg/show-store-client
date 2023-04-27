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
import Checkbox from "@/components/Checkbox";
import Radio from "@/components/Radio";
import LoadingText from "@/components/LoadingText";
import Input from "@/components/Input";
import Dropdown from "@/components/Dropdown";

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

  const validationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    address: z.string(),
    addressExtras: z.string().optional(),
    email: z.string(),
    country: z.string(),
    extraDeliveryNotes: z.string().optional(),
    paymentMode: z.union([z.literal("pay_on_delivery"), z.literal("pay_online")]),
  });

  const { handleSubmit, handleChange, errors, values, setFieldValue } = useFormik<
    z.infer<typeof validationSchema>
  >({
    validationSchema: toFormikValidationSchema(validationSchema),
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
    onSubmit: (data) => {},
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
        <Button
          className="w-full"
          right={
            <FontAwesomeIcon
              icon={values.paymentMode === "pay_on_delivery" ? faCheck : faCreditCard}
            />
          }
          type="submit"
          disabled={!!shippingPriceError}
        >
          {values.paymentMode === "pay_on_delivery" ? "Place order!" : "Continue to payment!"}
        </Button>
      </form>
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
};

export default CheckoutForm;
