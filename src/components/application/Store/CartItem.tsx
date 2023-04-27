import Button from "@/components/Button";
import { useCart } from "@/lib/zustand/useCart";
import { faXmark, faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { CartItem } from "@/lib/zustand/useCart";
import { calcItemTotal } from "@/utils/calc-total";

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
          <div className="flex items-center gap-2">
            <p className="text-sm">{baseItem.name}</p>
            <button
              onClick={() => removeItem({ id: baseItem.id, size })}
              className="text-red-500 text-sm"
              title="Remove item"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <p className="text-sm text-neutral-600">
              size {size} • {quantity} item{quantity > 1 ? "s" : null}
            </p>
            {quantity > 1 && (
              <button
                className="text-red-600 px-1 text-sm"
                onClick={() => decreaseItemQuantity({ id: baseItem.id, size })}
                title="Decrease quantity"
              >
                -
              </button>
            )}
            <button
              className="text-red-600 px-1 text-sm"
              onClick={() => increaseItemQuantity({ id: baseItem.id, size })}
              title="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div>
        <p>{calcItemTotal({ baseItem, size, quantity })}$</p>
      </div>
    </div>
  );
};

export default CartItem;
