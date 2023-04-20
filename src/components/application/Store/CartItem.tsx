import Button from "@/components/Button";
import { useCart } from "@/lib/zustand/useCart";
import { faXmark, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { CartItem } from "@/lib/zustand/useCart";

interface Props {
  item: CartItem;
}

const CartItem = ({ item: { baseItem, quantity, size } }: Props) => {
  const { removeItem, decreaseItemQuantity, increaseItemQuantity } = useCart((state) => state);

  return (
    <div className="flex items-center justify-between font-semibold gap-4">
      <div className="flex items-center gap-2">
        <img src={baseItem.images[0]} className="w-auto h-[40px] rounded-md" />
        <div>
          <p className="text-sm">{baseItem.name}</p>
          <div className="flex items-center gap-1 text-sm">
            <p className="text-sm text-neutral-600">
              {size} - {quantity} item{quantity > 1 ? "s" : null}
            </p>
            {quantity > 1 && (
              <button
                className="text-red-600 px-1 text-sm"
                onClick={() => decreaseItemQuantity({ id: baseItem.id, size })}
              >
                -
              </button>
            )}
            <button
              className="text-red-600 px-1 text-sm"
              onClick={() => increaseItemQuantity({ id: baseItem.id, size })}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div>
        <Button onClick={() => removeItem({ id: baseItem.id, size })} className="w-[40px] h-[40px]">
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
