"use client";

import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import { useCart } from "@/lib/zustand/useCart";
import { PRODUCT_SIZES } from "@/constants";
import { faCartPlus, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import type { Product } from "@prisma/client";

interface Props {
  product: Product;
}

const AddToCartForm = ({ product }: Props) => {
  const [sizeError, setSizeError] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart((state) => state);

  const increase = () => {
    setQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity <= 1) return;

    setQuantity(quantity - 1);
  };

  const addToCart = () => {
    if (!size) {
      setSizeError("You must select a size!");
      return;
    }

    addItem({
      baseItem: product,
      quantity,
      size,
    });
  };

  return (
    <>
      <Dropdown<string | null>
        options={PRODUCT_SIZES.map((size) => ({ key: size, value: size }))}
        setValue={(value) => {
          setSize(value);
          setSizeError(null);
        }}
        value={size}
        shownValue={size || ""}
        placeholder="Choose your size"
        error={sizeError || undefined}
        hasSearch
      />
      <div className="flex items-center justify-between font-semibold gap-4">
        <Button disabled={quantity <= 1} onClick={() => decrease()} className="w-[40px] h-[40px]">
          <FontAwesomeIcon icon={faMinus} />
        </Button>
        <p className="text-lg">{quantity}</p>
        <Button onClick={() => increase()} className="w-[40px] h-[40px]">
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
      <Button onClick={() => addToCart()} right={<FontAwesomeIcon icon={faCartPlus} />}>
        Add to cart{" "}
      </Button>
    </>
  );
};
export default AddToCartForm;
