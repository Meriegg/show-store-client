"use client";

import Button from "@/components/Button";
import { z } from "zod";
import { useCart } from "@/lib/zustand/useCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { OrderDataSchema } from "@/lib/zod/schemas";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Props {
  clientSecret: string;
  orderInformation: z.infer<typeof OrderDataSchema>;
  shippingPrice: number;
}

const StripeForm = ({ clientSecret, orderInformation, shippingPrice }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const { items } = useCart((items) => items);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const createOrder = api.order.createOrder.useMutation();

  const placeOrder = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      setMessage(null);
      if (!stripe || !elements) {
        return;
      }

      elements.submit();
      setMessage("Confirming your payment");

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: "http://localhost:3000/checkout",
        },
        redirect: "if_required",
      });

      if (error) {
        setLoading(false);
        switch (error.type) {
          case "validation_error":
            setErrorMessage(error.message || "An error happened!");
            return;

          case "card_error":
            setErrorMessage(error.message || "An error happened!");
            return;
          default:
            setErrorMessage("An unexpected error happened!");
            return;
        }
      }

      setMessage("Creating your order");

      await createOrder.mutateAsync({
        items,
        orderData: orderInformation,
        shippingPrice,
        setAsPaid: true,
      });

      setSuccess(true);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PaymentElement
        id="payment-element"
        options={{
          layout: "auto",
          fields: {
            billingDetails: {
              email: "auto",
              name: "auto",
            },
          },
          business: {
            name: "SHOW STORE",
          },
        }}
      />
      {errorMessage && (
        <div className="w-full flex flex-col text-base items-center gap-2 mt-4 text-red-500">
          <FontAwesomeIcon icon={faXmark} />
          <p className="font-semibold text-red-500">{errorMessage}</p>
        </div>
      )}

      {message && loading && (
        <div className="w-full flex flex-col text-base items-center gap-2 mt-4 text-neutral-600">
          <LoadingSpinner />
          <p className="font-semibold">{message}</p>
        </div>
      )}

      {success && (
        <div className="w-full flex flex-col text-base items-center gap-2 mt-4 text-green-500">
          <FontAwesomeIcon icon={faCheck} />
          <p className="font-semibold text-green-500">Order placed successfully!</p>
        </div>
      )}
      {!success && (
        <Button
          right={<FontAwesomeIcon icon={faCheck} />}
          disabled={loading}
          onClick={() => placeOrder()}
        >
          {errorMessage ? "Try again!" : "Place order!"}
        </Button>
      )}
    </>
  );
};
export default StripeForm;
